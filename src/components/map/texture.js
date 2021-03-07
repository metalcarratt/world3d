import waterTexture from '@/assets/water.texture';
import grassTexture from '@/assets/grass.texture';
import rockTexture from '@/assets/rock.texture';
import barkTexture from '@/assets/bark.texture';
import leavesTexture from '@/assets/leaves.texture';
import hairTexture from '@/assets/hair.texture';
import skinTexture from '@/assets/skin.texture';
import whiteClothTexture from '@/assets/whiteCloth.texture';
import woodTexture from '@/assets/wood.texture';

const WATER = 'water', GRASS = 'grass', ROCK = 'rock', BARK = 'bark', LEAVES = 'leaves', HAIR = 'hair', SKIN = 'skin',
    WHITE_CLOTH = 'whiteCloth', WOOD = 'wood';

export default {
    allTextures: [WATER, GRASS, ROCK, BARK, LEAVES, HAIR, SKIN, WHITE_CLOTH, WOOD],
    getTextureForName(name) {
        switch (name) {
            case WATER:
                return waterTexture;

            case GRASS:
                return grassTexture;
            
            case ROCK:
                return rockTexture;

            case BARK:
                return barkTexture;

            case LEAVES:
                return leavesTexture;

            case HAIR:
                return hairTexture;

            case SKIN:
                return skinTexture;

            case WHITE_CLOTH:
                return whiteClothTexture;

            case WOOD:
                return woodTexture;
        }
    }
}