#ifndef COMBO_CSMC_H
#define COMBO_CSMC_H

#include <combo/types.h>
#include <combo/common/color.h>

#define CSMC_NORMAL         0x00
#define CSMC_BOSS_KEY       0x01
#define CSMC_MAJOR          0x02
#define CSMC_KEY            0x03
#define CSMC_SPIDER         0x04
#define CSMC_FAIRY          0x05
#define CSMC_HEART          0x06
#define CSMC_SOUL           0x07
#define CSMC_MAP_COMPASS    0x08

#define CSMC_POT_NORMAL             0x00
#define CSMC_POT_NORMAL_DANGEON     0x01
#define CSMC_POT_MAGIC              0x02
#define CSMC_POT_MAJOR              0x03
#define CSMC_POT_SPIDER             0x04
#define CSMC_POT_FAIRY              0x05
#define CSMC_POT_KEY                0x06
#define CSMC_POT_HEART              0x07
#define CSMC_POT_BOSSKEY            0x08
#define CSMC_POT_SOUL               0x09
#define CSMC_POT_MAP_COMPASS        0x0a

#define CSMC_GRASS_NORMAL       0x00
#define CSMC_GRASS_BOSS_KEY     0x01
#define CSMC_GRASS_MAJOR        0x02
#define CSMC_GRASS_KEY          0x03
#define CSMC_GRASS_SPIDER       0x04
#define CSMC_GRASS_FAIRY        0x05
#define CSMC_GRASS_HEART        0x06
#define CSMC_GRASS_SOUL         0x07
#define CSMC_GRASS_MAP_COMPASS  0x08

#define CSMC_GS_NORMAL          0x00
#define CSMC_GS_BOSS_KEY        0x01
#define CSMC_GS_MAJOR           0x02
#define CSMC_GS_KEY             0x03
#define CSMC_GS_SPIDER          0x04
#define CSMC_GS_FAIRY           0x05
#define CSMC_GS_HEART           0x06
#define CSMC_GS_SOUL            0x07
#define CSMC_GS_MAP_COMPASS     0x08

#define CTF_MIRROR          (1 << 0)
#define CTF_CLAMP           (1 << 1)
#define CTF_COLOR           (1 << 2)
#define CTF_CUSTOM_TEXTURE  (1 << 3)

typedef struct
{
    u32 addr;
    u32 color;
    u8 flags;
    u8 fmt;
    u8 bpp;
    u8 w;
    u8 h;
}
CsmcDisplayList;

typedef struct PlayState PlayState;
typedef struct Actor Actor;

/* Generic */
void*   csmcLoadTexture(u8 custom, u32 addr, int fmt, int bpp, int w, int h, int mirror);
void*   csmcLoadTextureEx(const CsmcDisplayList* dl);
int     csmcFromItem(s16 gi);
int     csmcEnabled(void);
int     csmcEnabledSkulltula(void);
int     csmcEnabledCow(void);
int     csmcEnabledGrassPot(void);

/* Chest */
void    csmcChestInit(Actor* this, PlayState* play, s16 gi);
void    csmcChestPreDraw(Actor* this, PlayState* play, s16 gi);
int     csmcChestLarge(s16 gi);

/* Pots */
void csmcPotPreDraw(Actor* this, PlayState* play, s16 gi, int def);

/* Grass */
void csmcGrassPreDraw(PlayState* play, s16 gi, int def, int alt, int direct);

/* GS */
void csmcGsPreDraw(PlayState* play, s16 gi);

const Color_RGB8* csmcTypeColor(int type);

#endif
