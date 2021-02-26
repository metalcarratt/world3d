import waterTexture from '@/assets/water.texture';
import grassTexture from '@/assets/grass.texture';
import rockTexture from '@/assets/rock.texture';
import barkTexture from '@/assets/bark.texture';
import leavesTexture from '@/assets/leaves.texture';
import hairTexture from '@/assets/hair.texture';
import skinTexture from '@/assets/skin.texture';
import whiteClothTexture from '@/assets/whiteCloth.texture';

export default {
    getTextureForName(name) {
        switch (name) {
            case 'water':
                return waterTexture;

            case 'grass':
                return grassTexture;
            
            case 'rock':
                return rockTexture;

            case 'bark':
                return barkTexture;

            case 'leaves':
                return leavesTexture;

            case 'hair':
                return hairTexture;

            case 'skin':
                return skinTexture;

            case 'whiteCloth':
                return whiteClothTexture;
        }
    }
}