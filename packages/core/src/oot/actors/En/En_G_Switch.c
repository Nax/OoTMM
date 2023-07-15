#include <combo.h>
#include <combo/item.h>

static u32* const kFlags[] = {
    &gOotSilverRupeeFlags1,
    &gOotSilverRupeeFlags2,
    &gOotSilverRupeeFlags3,
    &gOotSilverRupeeFlags4,
};

static int EnGSwitch_GetFlag(int flag)
{
    u32* record;

    record = kFlags[flag / 32];
    flag %= 32;

    return !!(*record & (1 << flag));
}

static void EnGSwitch_SetFlag(int flag)
{
    u32* record;

    record = kFlags[flag / 32];
    flag %= 32;

    *record |= (1 << flag);
}

static u16 EnGSwitch_LocalID(Actor* this)
{
    return *(u16*)((char*)this + 0x148);
}

static u16 EnGSwitch_ID(Actor* this, GameState_Play* play)
{
    u16 base;
    u16 offset;

    switch (play->sceneId)
    {
    case SCE_OOT_DODONGO_CAVERN:
        base = 0x00;
        break;
    case SCE_OOT_BOTTOM_OF_THE_WELL:
        base = 0x05;
        break;
    case SCE_OOT_TEMPLE_SPIRIT:
        switch (play->roomCtx.curRoom.num)
        {
        case 0x00:
        case 0x02:
            base = 0x0a;
            break;
        case 0x08:
        case 0x17:
            base = 0x0f;
            break;
        case 0x0d:
            base = 0x14;
            break;
        default:
            UNREACHABLE();
        }
        break;
    case SCE_OOT_TEMPLE_SHADOW:
        switch (play->roomCtx.curRoom.num)
        {
        case 0x06:
            base = 0x19;
            break;
        case 0x10:
            base = 0x1e;
            break;
        case 0x09:
            base = 0x28;
            break;
        case 0x0b:
            base = 0x2d;
            break;
        default:
            UNREACHABLE();
        }
        break;
    case SCE_OOT_ICE_CAVERN:
        switch (play->roomCtx.curRoom.num)
        {
        case 0x03:
            base = 0x37;
            break;
        case 0x05:
            base = 0x3c;
            break;
        default:
            UNREACHABLE();
        }
        break;
    case SCE_OOT_GERUDO_TRAINING_GROUND:
        switch (play->roomCtx.curRoom.num)
        {
        case 0x02:
            base = 0x41;
            break;
        case 0x06:
            base = 0x46;
            break;
        case 0x09:
            base = 0x4c;
            break;
        default:
            UNREACHABLE();
        }
        break;
    case SCE_OOT_INSIDE_GANON_CASTLE:
        switch (play->roomCtx.curRoom.num)
        {
        case 0x0c:
        case 0x11:
            base = 0x51;
            break;
        case 0x03:
        case 0x08:
            base = 0x56;
            break;
        case 0x0e:
            base = 0x5b;
            break;
        case 0x06:
            base = 0x60;
            break;
        default:
            UNREACHABLE();
        }
        break;
    default:
        UNREACHABLE();
    }
    offset = EnGSwitch_LocalID(this);

    return base + offset;
}

static void EnGSwitch_ItemQuery(ComboItemQuery* q, Actor* this, GameState_Play* play)
{
    bzero(q, sizeof(*q));
    q->ovType = OV_SR;
    q->id = EnGSwitch_ID(this, play);
}

static void EnGSwitch_ItemOverride(ComboItemOverride* o, Actor* this, GameState_Play* play)
{
    ComboItemQuery q;

    EnGSwitch_ItemQuery(&q, this, play);
    comboItemOverride(o, &q);
}

int EnGSwitch_AlreadyTaken(GameState_Play* play, Actor* this)
{
    u16 id;

    /* Compute and store the ID */
    id = g.silverRupee++;
    *(u16*)((char*)this + 0x148) = id;

    /* Check for flag */
    return EnGSwitch_GetFlag(EnGSwitch_ID(this, play));
}

void EnGSwitch_DrawSilverRupee(Actor* this, GameState_Play* play)
{
    static const float scale = 12.5f;
    ComboItemOverride o;

    EnGSwitch_ItemOverride(&o, this, play);
    ModelViewScale(scale, scale, scale, MAT_MUL);
    comboDrawGI(play, this, o.gi, 0);
}

void EnGSwitch_GiveItemSilverRupee(Actor* this)
{
    ComboItemQuery q;

    PlaySound(0x4803);
    EnGSwitch_ItemQuery(&q, this, gPlay);
    PlayerDisplayTextBox(gPlay, 0xb4, NULL);
    comboAddItemEx(gPlay, &q);
    EnGSwitch_SetFlag(EnGSwitch_ID(this, gPlay));
}
