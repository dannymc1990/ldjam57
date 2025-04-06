import { texturePacker } from "@assetpack/core/texture-packer"

export default {
    entry: './raw-assets',
    output: './public/assets',
    pipes: [
        texturePacker({})
    ]
}