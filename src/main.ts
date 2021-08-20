import $ from 'jquery';
import { CheckWebGPU } from './helper';
import { Shaders } from './shaders';

const CreatePrimitive = async (primitiveType = 'triangle-list') => { 
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes('Your current browser does not support WebGPU!')){
        console.log(checkgpu);
        throw('Your current browser does not support WebGPU!');
    }

    let indexFormat = undefined;
    if(primitiveType === 'triangle-strip'){
        indexFormat = 'uint32'
    }
    
    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;       
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext('webgpu') as GPUCanvasContext;

    const format = 'bgra8unorm';
    context.configure({
        device: device,
        format: format,
    });

    const shader = Shaders();
    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: shader.vertex
            }),
            entryPoint: "main"
        },
        fragment: {
            module: device.createShaderModule({
                code: shader.fragment
            }),
            entryPoint: "main",
            targets: [{
                format: format as GPUTextureFormat
            }]
        },
        primitive:{
            topology: primitiveType as GPUPrimitiveTopology,
            stripIndexFormat: indexFormat as GPUIndexFormat
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            loadValue: [0.5, 0.5, 0.8, 1], //background color
            storeOp: 'store'
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.draw(9, 1, 0, 0);
    renderPass.endPass();
    
    device.queue.submit([commandEncoder.finish()]);
}

CreatePrimitive();
$('#id-primitive').on('change', ()=>{
    const primitiveType = $('#id-primitive').val() as string;
    CreatePrimitive(primitiveType);
});


