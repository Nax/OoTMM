#include <combo.h>
#include <combo/csmc.h>
#include <combo/item.h>
#include <combo/config.h>

static const Color_RGB8 kColorBossKey  = { 0x00, 0x00, 0xff };
static const Color_RGB8 kColorMajor    = { 0xff, 0xff, 0x00 };
static const Color_RGB8 kColorKey      = { 0x44, 0x44, 0x44 };
static const Color_RGB8 kColorSpider   = { 0xff, 0xff, 0xff };
static const Color_RGB8 kColorFairy    = { 0xff, 0x7a, 0xfb };
static const Color_RGB8 kColorHeart    = { 0xff, 0x00, 0x00 };
static const Color_RGB8 kColorSoul     = { 0x34, 0x0b, 0x9c };
static const Color_RGB8 kColorMap      = { 0xc7, 0x50, 0x00 };
static const Color_RGB8 kColorNormal   = { 0x29, 0x14, 0x0a };

const Color_RGB8* csmcTypeColor(int type)
{
    switch (type)
    {
    case CSMC_BOSS_KEY: return &kColorBossKey;
    case CSMC_MAJOR: return &kColorMajor;
    case CSMC_KEY: return &kColorKey;
    case CSMC_SPIDER: return &kColorSpider;
    case CSMC_FAIRY: return &kColorFairy;
    case CSMC_HEART: return &kColorHeart;
    case CSMC_SOUL: return &kColorSoul;
    case CSMC_MAP_COMPASS: return &kColorMap;
    case CSMC_NORMAL: return &kColorNormal;
    default: UNREACHABLE();
    }
}

int csmcFromItem(s16 gi)
{
    if (gi == 0)
        return CSMC_NORMAL;
    if (gi < 0)
        gi = -gi;

    /* Special case: OoT bombchu */
    if (gComboConfig.bombchuBehaviorOot == BOMBCHU_BEHAVIOR_BAG_FIRST)
    {
        switch (gi)
        {
        case GI_OOT_BOMBCHU_5:
        case GI_OOT_BOMBCHU_10:
        case GI_OOT_BOMBCHU_20:
            return CSMC_MAJOR;
        }
    }

    /* Special case: MM bombchu */
    if (gComboConfig.bombchuBehaviorMm == BOMBCHU_BEHAVIOR_BAG_FIRST)
    {
        switch (gi)
        {
        case GI_MM_BOMBCHU:
        case GI_MM_BOMBCHU_5:
        case GI_MM_BOMBCHU_10:
        case GI_MM_BOMBCHU_20:
            return CSMC_MAJOR;
        }
    }

    switch (comboItemType(gi))
    {
    case ITT_MAJOR:
    case ITT_MASK:
        return CSMC_MAJOR;
    case ITT_BOSS_KEY:
        return CSMC_BOSS_KEY;
    case ITT_KEY:
        return CSMC_KEY;
    case ITT_SKULL:
        return CSMC_SPIDER;
    case ITT_FAIRY:
        return CSMC_FAIRY;
    case ITT_HEART:
        return Config_Flag(CFG_CSMC_HEARTS) ? CSMC_HEART : CSMC_NORMAL;
    case ITT_MAP_COMPASS:
        return Config_Flag(CFG_CSMC_MAP_COMPASS) ? CSMC_MAP_COMPASS : CSMC_NORMAL;
    case ITT_SOUL:
        return CSMC_SOUL;
    case ITT_NONE:
    case ITT_RUPEE:
    case ITT_MINOR:
    case ITT_NORMAL:
    default:
        return CSMC_NORMAL;
    }
}

static int hasStoneAgonyForCsmc(void)
{
#if defined(GAME_MM)
    if (Config_Flag(CFG_MM_STONE_OF_AGONY))
        return gMmExtraFlags3.stoneAgony;
#endif

    return gOotSave.info.inventory.quest.agonyStone;
}

int csmcEnabled(void)
{
    return (Config_Flag(CFG_CSMC) || (Config_Flag(CFG_CSMC_AGONY) && hasStoneAgonyForCsmc()));
}

int csmcEnabledSkulltula(void)
{
    return csmcEnabled() && Config_Flag(CFG_CSMC_SKULLTULA);
}

int csmcEnabledCow(void)
{
    return csmcEnabled() && Config_Flag(CFG_CSMC_COW);
}

int csmcEnabledGrassPot(void)
{
    return (Config_Flag(CFG_CSMC_GRASS_POT) && !Config_Flag(CFG_CSMC_AGONY)) || (Config_Flag(CFG_CSMC_GRASS_POT) && Config_Flag(CFG_CSMC_AGONY) && gOotSave.inventory.quest.agonyStone));
}