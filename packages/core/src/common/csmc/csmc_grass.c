#include <combo.h>
#include <combo/csmc.h>
#include <combo/custom.h>

#if defined(GAME_OOT)
# define TEXTURE_ADDR_STANDARD  0x0500b140
# define TEXTURE_ADDR_ALT       0x04035BD0
#else
# define TEXTURE_ADDR_STANDARD  0x05007010
# define TEXTURE_ADDR_ALT       0x04052940
#endif

static const u32 kColorBossKey  = 0x0000ffff;
static const u32 kColorMajor    = 0xffff00ff;
static const u32 kColorKey      = 0x444444ff;
static const u32 kColorSpider   = 0xffffffff;
static const u32 kColorFairy    = 0xff7afbff;
static const u32 kColorHeart    = 0xff0000ff;
static const u32 kColorSoul     = 0x340b9cff;
static const u32 kColorMap      = 0xc75000ff;

static const CsmcDisplayList kGrassStandardDlist[] = {
    { TEXTURE_ADDR_STANDARD,    0xffffffff,    CTF_COLOR | CTF_CLAMP,                       G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorBossKey, CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorMajor,   CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorKey,     CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorSpider,  CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorFairy,   CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorHeart,   CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorSoul,    CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ADDR,        kColorMap,     CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
};

static const CsmcDisplayList kGrassAltDlist[] = {
    { TEXTURE_ADDR_ALT,         0xffffffff,    CTF_COLOR | CTF_CLAMP,                       G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorBossKey, CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorMajor,   CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorKey,     CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorSpider,  CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorFairy,   CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorHeart,   CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorSoul,    CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
    { CUSTOM_GRASS_ALT_ADDR,    kColorMap,     CTF_CUSTOM_TEXTURE | CTF_COLOR | CTF_CLAMP,  G_IM_FMT_RGBA, G_IM_SIZ_16b, 32, 32 },
};

static int csmcGrassId(s16 gi, int def)
{
    int csmcId;

    if (gi == 0)
        return def;
    if (!csmcEnabledGrassPot())
        return CSMC_GRASS_MAJOR;

    csmcId = csmcFromItem(gi);
    switch (csmcId)
    {
    case CSMC_NORMAL:       return def;
    case CSMC_BOSS_KEY:     return CSMC_GRASS_BOSS_KEY;
    case CSMC_MAJOR:        return CSMC_GRASS_MAJOR;
    case CSMC_KEY:          return CSMC_GRASS_KEY;
    case CSMC_SPIDER:       return CSMC_GRASS_SPIDER;
    case CSMC_FAIRY:        return CSMC_GRASS_FAIRY;
    case CSMC_HEART:        return CSMC_GRASS_HEART;
    case CSMC_SOUL:         return CSMC_GRASS_SOUL;
    case CSMC_MAP_COMPASS:  return CSMC_GRASS_MAP_COMPASS;
    default:                return CSMC_GRASS_MAJOR;
    }
}

void csmcGrassPreDraw(PlayState* play, s16 gi, int def, int alt, int direct)
{
    const CsmcDisplayList* dlists;
    int id;
    const void* list;

    if (alt)
        dlists = kGrassAltDlist;
    else
        dlists = kGrassStandardDlist;

    id = csmcGrassId(gi, def);
    list = csmcLoadTextureEx(&dlists[id]);

    OPEN_DISPS(play->state.gfxCtx);
    if (direct)
    {
        gSPDisplayList(POLY_OPA_DISP++, list);
    }
    else
    {
        gSPSegment(POLY_OPA_DISP++, 0x0a, list);
    }
    CLOSE_DISPS();
}
