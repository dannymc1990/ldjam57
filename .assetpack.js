import { pixiManifest } from "@assetpack/core/manifest"
import { texturePacker } from "@assetpack/core/texture-packer"

export default {
    entry: './raw-assets',
    output: './public/assets',
    pipes: [
        texturePacker({}),
        pixiManifest({
            output: 'manifest.json'
        })
    ]
}