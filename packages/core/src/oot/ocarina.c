#include <combo.h>

extern u32 gOcarinaPressedButtons;
extern u8 gInCustomSong;

static OcarinaSongButtons sSongSoaring = {
    6,
    {
        OCARINA_BTN_C_DOWN,
        OCARINA_BTN_C_LEFT,
        OCARINA_BTN_C_UP,
        OCARINA_BTN_C_DOWN,
        OCARINA_BTN_C_LEFT,
        OCARINA_BTN_C_UP,
    }
};

void Ocarina_CheckCustomSongs(void)
{
    if (!gMmSave.inventory.quest.songSoaring)
        return;

    if (!comboConfig(CFG_MM_CROSS_WARP))
        return;

    if (!comboConfig(CFG_MM_CROSS_WARP_ADULT) && gSave.age == AGE_ADULT)
        return;

    comboCheckSong(&sSongSoaring, 0);
}

void OcarinaMaskButtons(void)
{
    u32 mask;

    mask = ~(A_BUTTON | U_CBUTTONS | D_CBUTTONS | L_CBUTTONS | R_CBUTTONS);
    mask |= gSharedCustomSave.ocarinaButtonMaskOot;
    gOcarinaPressedButtons &= mask;
}

s32 canChangeAge = 1;

static void changeAgeMessage(GameState_Play* play, s32 toChild)
{
    char* b;

    b = play->msgCtx.textBuffer;
    comboTextAppendHeader(&b);
    if (toChild) {
        comboTextAppendStr(&b, "Become a " TEXT_COLOR_RED "child");
    } else {
        comboTextAppendStr(&b, "Become an " TEXT_COLOR_RED "adult");
    }
    comboTextAppendStr(&b, TEXT_CZ "?" TEXT_NL TEXT_NL TEXT_COLOR_GREEN TEXT_CHOICE2 "OK" TEXT_NL "No" TEXT_END);
}

void Ocarina_HandleLastPlayedSong(GameState_Play* play, Actor_Player* player, s16 lastPlayedSong)
{
    s32 canChangeAge;
    switch (lastPlayedSong) {
        // Displaced code:
        case OCARINA_SONG_SARIAS:
            player->naviTextId = -0xE0;
            player->naviActor->flags |= (1 << 16); // ACTOR_FLAG_16
            break;
        // End displaced code.
        case OCARINA_SONG_TIME:
            canChangeAge = 1; // comboConfig(CFG_OOT_AGE_CHANGE);
            if (canChangeAge) {
                if (!GetEventChk(EV_OOT_CHK_MASTER_SWORD_CHAMBER) || !GetEventChk(EV_OOT_CHK_MASTER_SWORD_PULLED)) {
                    canChangeAge = 0;
                }
            }
            if (canChangeAge) {
                switch (play->sceneId) {
                    case SCE_OOT_GANON_TOWER_COLLAPSING:
                    case SCE_OOT_INSIDE_GANON_CASTLE_COLLAPSING:
                    case SCE_OOT_TREASURE_SHOP:
                    case SCE_OOT_LAIR_GOHMA:
                    case SCE_OOT_LAIR_KING_DODONGO:
                    case SCE_OOT_LAIR_BARINADE:
                    case SCE_OOT_LAIR_PHANTOM_GANON:
                    case SCE_OOT_LAIR_VOLVAGIA:
                    case SCE_OOT_LAIR_MORPHA:
                    case SCE_OOT_LAIR_TWINROVA:
                    case SCE_OOT_LAIR_BONGO_BONGO:
                    case SCE_OOT_LAIR_GANONDORF:
                    case SCE_OOT_TOWER_COLLAPSE_EXTERIOR:
                    case SCE_OOT_GROTTOS:
                    case SCE_OOT_CASTLE_MAZE_DAY:
                    case SCE_OOT_CASTLE_MAZE_NIGHT:
                    case SCE_OOT_CASTLE_COURTYARD:
                    case SCE_OOT_GANON_BATTLE_ARENA:
                    case SCE_OOT_HYRULE_CASTLE:
                    case SCE_OOT_GANON_CASTLE_EXTERIOR:
                        canChangeAge = 0;
                        break;
                }
            }
            if (canChangeAge) {
                ActorContext* actorCtx = &play->actorCtx;
                Actor* actor = actorCtx->actors[7].first; // ACTORCAT_ITEMACTION

                while (actor != NULL) {
                    if (actor->id == 0x1D1 || actor->id == 0x1D6) { // ACTOR_OBJ_TIMEBLOCK || ACTOR_OBJ_WARP2BLOCK
                        Actor_ObjTimeblockWarp2Block* timeblock = (Actor_ObjTimeblockWarp2Block*) actor;
                        if (timeblock->demoEffectTimer != 0) {
                            canChangeAge = 0;
                            break;
                        }
                    }
                    actor = actor->next;
                }
            }
            if (canChangeAge)
            {
                PlayerDisplayTextBox(play, 0x88d, NULL);
                changeAgeMessage(play, !gSaveContext.save.age);
                gInCustomSong = 2;
            }
            break;
    }
}
