<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

    const cropperRef = ref(null)
    const imgSrc = ref<string | null>(null)
    const imgType = ref<string | null>(null)
    const croppedImg = ref()

    const emit = defineEmits(['cropped']);

    // This function is used to detect the actual image type, 
function getMimeType(file: Iterable<number>, fallback: string | null = null): string | null {
    const byteArray = new Uint8Array(file).subarray(0, 4);
    const header = Array.from(byteArray)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

    const mimeTypes = new Map<string, string>([
        ["89504e47", "image/png"],
        ["47494638", "image/gif"],
        ["ffd8ffe0", "image/jpeg"],
        ["ffd8ffe1", "image/jpeg"],
        ["ffd8ffe2", "image/jpeg"],
        ["ffd8ffe3", "image/jpeg"],
        ["ffd8ffe8", "image/jpeg"]
    ]);

    return mimeTypes.get(header) || fallback;
}

const crop = () => {
    if (cropperRef.value) {
        const { canvas } = cropperRef?.value?.getResult();
        canvas.toBlob((blob: Blob | null) => {
            if (blob && imgType.value) {
                const file = new File([blob], 'cropped-image.png', { type: imgType.value });
                emit('cropped', file);
            }
        }, imgType.value);
    }
};

const reset = () => {
    imgSrc.value = null;
    imgType.value = null;
    croppedImg.value = null;
}
    
const loadImage = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files[0]) {
        if (imgSrc.value) {
            URL.revokeObjectURL(imgSrc.value);
        }
        const blob = URL.createObjectURL(files[0]);
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target) {
                imgSrc.value = blob;
                const arrayBuffer = e.target.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);
                imgType.value = getMimeType(uint8Array, files[0].type);
            }
        };
        reader.readAsArrayBuffer(files[0]);
    }
};


const flip = (x: any,y: any) => {
    if(cropperRef?.value)
	    cropperRef?.value?.flip(x,y);
}
const rotate = (angle: number)=> {
    cropperRef?.value?.rotate(angle * 90);
}
</script>
<template>
    <div>
        <div v-if="!imgSrc" class="flex items-center justify-center credit-card mx-auto border-4 bg-gray-100 border-dashed border-gray-300 rounded-lg cursor-pointer">
            <label for="cardImage" class="flex items-center justify-center w-full h-full cursor-pointer">
                <Icon name="i-ph-plus-light" class="text-gray-300 text-8xl"/>
            </label>
            <input type="file" id="cardImage" class="hidden" @change="loadImage" accept="image/*" />
        </div>
        <!-- <label></label>
        <input type="file" id="cardImage" class="w-full my-6" @change="loadImage" accept="image/*" /> -->
        <div  v-else>
            <cropper
                ref="cropperRef"
                class="credit-card shadow-md overflow-hidden m-auto !max-w-[323px]"
                :canvas="{
                    width: 485,
                    height: 306,
                }"
                
                :src="imgSrc"
                :stencil-props="{
                    handlers: {},
                    movable: false,
                    resizable: false,
                    aspectRatio: 323/204,
                }"
                :stencil-size="{
                    width: 323,
                    height: 204
                }"
                :resize-image="{
                    adjustStencil: false,
                }"
                image-restriction="fill-area"
                @change="crop"
            />
            <div class="flex justify-between  gap-4 mt-4">
                <button @click="flip(true, false)" class="btn-square bg-blue-600 text-blue-600">
                    <Icon name="i-ph-flip-horizontal-duotone"/>
                </button>
                <button @click="flip(false, true)" class="btn-square bg-blue-600 text-blue-600">
                    <Icon name="i-ph-flip-vertical-duotone"/>
                </button>
                <button @click="rotate(1)" class="btn-square bg-green-600 text-green-600">
                    <Icon name="i-ph-arrow-clockwise-duotone"/>
                </button>
                <button @click="rotate(-1)" class="btn-square bg-green-600 text-green-600">
                    <Icon name="i-ph-arrow-counter-clockwise-duotone"/>
                </button>
                <button @click="reset" class="btn-square bg-red-600 text-red-600">
                    <Icon name="i-ph-x-light"/>
                </button>
            </div>
            <div class="my-6 text-sm">* Use gestures or mouse to zoom and move the image</div>
        </div>
    </div>
</template>


<style scoped>

</style>