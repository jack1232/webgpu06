export const Shaders = () => {
    const vertex = `  
    struct Output {
        @builtin(position) Position : vec4<f32>,
        @location(0) vColor : vec4<f32>,
    };

    @vertex
    fn main(@builtin(vertex_index) VertexIndex: u32) -> Output {
        var pos : array<vec2<f32>, 9> = array<vec2<f32>, 9>(             
            vec2<f32>(-0.63,  0.80),
            vec2<f32>(-0.65,  0.20),
            vec2<f32>(-0.20,  0.60),
            vec2<f32>(-0.37, -0.07),
            vec2<f32>( 0.05,  0.18),
            vec2<f32>(-0.13, -0.40),
            vec2<f32>( 0.30, -0.13),
            vec2<f32>( 0.13, -0.64),
            vec2<f32>( 0.70, -0.30)     
        );
    
        var color : array<vec3<f32>, 9> = array<vec3<f32>, 9>(             
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0),
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0),
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0),  
        );

        var output: Output;
        output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        output.vColor = vec4<f32>(color[VertexIndex], 1.0);
        return output;
    }`

    const fragment = `
        @fragment
        fn main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
            return vColor;
        }
    `;
    return {vertex, fragment};
}

export const ShadersOld1 = () => {
    const vertex = `
    let pos : array<vec2<f32>, 9> = array<vec2<f32>, 9>(             
        vec2<f32>(-0.63,  0.80),
        vec2<f32>(-0.65,  0.20),
        vec2<f32>(-0.20,  0.60),
        vec2<f32>(-0.37, -0.07),
        vec2<f32>( 0.05,  0.18),
        vec2<f32>(-0.13, -0.40),
        vec2<f32>( 0.30, -0.13),
        vec2<f32>( 0.13, -0.64),
        vec2<f32>( 0.70, -0.30)     
    );

    let color : array<vec3<f32>, 9> = array<vec3<f32>, 9>(             
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),  
    );

    struct Output {
        [[builtin(position)]] Position : vec4<f32>;
        [[location(0)]] vColor : vec4<f32>;
    };

    [[stage(vertex)]]
    fn main([[builtin(vertex_index)]] VertexIndex: u32) -> Output {
        var output: Output;
        output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        output.vColor = vec4<f32>(color[VertexIndex], 1.0);
        return output;
    }`

    const fragment = `
        [[stage(fragment)]]
        fn main([[location(0)]] vColor: vec4<f32>) -> [[location(0)]] vec4<f32> {
            return vColor;
        }
    `;
    return {vertex, fragment};
}

export const ShadersOld = () => {
    const vertex = `
    const pos : array<vec2<f32>, 9> = array<vec2<f32>, 9>(             
        vec2<f32>(-0.63,  0.80),
        vec2<f32>(-0.65,  0.20),
        vec2<f32>(-0.20,  0.60),
        vec2<f32>(-0.37, -0.07),
        vec2<f32>( 0.05,  0.18),
        vec2<f32>(-0.13, -0.40),
        vec2<f32>( 0.30, -0.13),
        vec2<f32>( 0.13, -0.64),
        vec2<f32>( 0.70, -0.30)     
    );

    const color : array<vec3<f32>, 9> = array<vec3<f32>, 9>(             
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),
        vec3<f32>(1.0, 0.0, 0.0),
        vec3<f32>(0.0, 1.0, 0.0),
        vec3<f32>(0.0, 0.0, 1.0),  
    );

    [[builtin(position)]] var<out> Position : vec4<f32>;
    [[builtin(vertex_idx)]] var<in> VertexIndex : i32;
    [[location(0)]] var<out> vColor : vec4<f32>;

    [[stage(vertex)]]
    fn main() -> void {
      Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
      vColor = vec4<f32>(color[VertexIndex], 1.0);
      return;
    }`

    const fragment = `
        [[location(0)]] var<in> vColor : vec4<f32>;
        [[location(0)]] var<out> outColor : vec4<f32>;
        [[stage(fragment)]]
        fn main() -> void {
            outColor = vColor;
            return;
        }
    `;
    return {vertex, fragment};
}
