#ifndef COMBO_COMMON_API_H
#define COMBO_COMMON_API_H

#include <combo/types.h>
#include <combo/math/vec.h>
#include <combo/gi.h>

typedef struct Font Font;
typedef struct PlayState PlayState;
typedef struct ActorContext ActorContext;
typedef struct TitleCardContext TitleCardContext;
typedef struct Actor Actor;
typedef struct Player Player;
typedef struct DynaCollisionContext DynaCollisionContext;
typedef struct AnimationHeader AnimationHeader;
typedef enum PlayerItemAction PlayerItemAction;
#if defined(GAME_MM)
typedef enum BombersNotebookPerson BombersNotebookPerson;
typedef enum BombersNotebookEvent BombersNotebookEvent;
typedef void (*ActorShadowFunc)(struct Actor* actor, struct Lights* mapper, PlayState* play);
#endif

int TitleCard_Clear(PlayState* play, TitleCardContext* titleCtx);

float Actor_WorldDistXZToActor(Actor* a, Actor* b);
float Actor_HeightDiff(Actor* a, Actor* b);
u16   Actor_Angle(Actor* a, Actor* b);
void Actor_DrawDoorLock(PlayState* play, s32 frame, s32 type);

Gfx* Gfx_Open(Gfx* gfx);
void Gfx_Close(Gfx* gfxRef, Gfx* gfx);

void Gfx_SetupDL_39Opa(GraphicsContext* gfxCtx);
void Gfx_SetupDL_39Ptr(Gfx** gfxPtr);
void Gfx_SetupDL_56Ptr(Gfx** gfxPtr);

#if defined(GAME_MM)
#define SEQCMD_PLAY_SEQUENCE(seqPlayerIndex, fadeInDuration, seqId)                                                   \
    AudioSeq_QueueSeqCmd((0 << 28) | ((seqPlayerIndex) << 24) | ((u32)(fadeInDuration) << 16) | \
                         (u32)(seqId))

#define SEQCMD_STOP_SEQUENCE(seqPlayerIndex, fadeOutDuration)                                    \
    AudioSeq_QueueSeqCmd((1 << 28) | 0xFF | ((u8)(seqPlayerIndex) << 24) | \
                         ((fadeOutDuration) << 16))
#endif

void Gfx_SetupFrame(GraphicsContext* gfxCtx, u8 r, u8 g, u8 b);

/* Unknown */
void* UnkFuncActorCollision(PlayState* play, Actor* actor);

int CutsceneFlags_Get(PlayState* play, int flag);

s32             DynaPoly_IsBgIdBgActor(s32 bgId);
void            DynaPoly_DisableCollision(PlayState* play, DynaCollisionContext* dyna, s32 bgId);
void            DynaPoly_EnableCollision(PlayState* play, DynaCollisionContext* dyna, s32 bgId);
void            DynaPoly_DisableCeilingCollision(PlayState* play, DynaCollisionContext* dyna, s32 bgId);
s32             DynaPoly_SetBgActor(PlayState* play, DynaCollisionContext* dyna, Actor* actor, CollisionHeader* colHeader);
DynaPolyActor*  DynaPoly_GetActor(CollisionContext* colCtx, s32 bgId);
void            DynaPoly_DeleteBgActor(PlayState* play, DynaCollisionContext* dyna, s32 bgId);
void            DynaPoly_InvalidateLookup(PlayState* play, DynaCollisionContext* dyna);
void            DynaPoly_UnsetAllInteractFlags(PlayState* play, DynaCollisionContext* dyna, Actor* actor);
void            DynaPoly_UpdateContext(PlayState* play, DynaCollisionContext* dyna);
void            DynaPoly_UpdateBgActorTransforms(PlayState* play, DynaCollisionContext* dyna);

void    CollisionHeader_GetVirtual(void* colHeader, CollisionHeader** dest);
void    Interface_UpdateButtonsPart2(PlayState* play);

int    LoadFile(void* dst, u32 vromAddr, u32 size);

void    Actor_Noop(Actor* actor, PlayState* play);
Actor*  Actor_Spawn(ActorContext* actorCtx, PlayState* play, s16 actorId, float x, float y, float z, s16 rx, s16 ry, s16 rz, u16 variable);

#if defined(GAME_OOT)
Actor*  _Actor_Spawn(ActorContext* actorCtx, PlayState* play, s16 actorId, float x, float y, float z, s16 rx, s16 ry, s16 rz, u16 variable);
#endif

#if defined(GAME_MM)
Actor*  Actor_SpawnAsChildAndCutscene(ActorContext* actorCtx, PlayState* play, s16 actorId, float x, float y, float z, s16 rx, s16 ry, s16 rz, u16 variable, int ex1, int ex2, int ex3);
Actor*  _Actor_SpawnAsChildAndCutscene(ActorContext* actorCtx, PlayState* play, s16 actorId, float x, float y, float z, s16 rx, s16 ry, s16 rz, u16 variable, int ex1, int ex2, int ex3);
int Schedule_CheckMiscS(PlayState* play, void* unk);
#endif

void Fault_AddHungupAndCrashImpl(const char* str1, const char* str2);

void AudioSeq_QueueSeqCmd(u32 unk);

typedef struct Lights Lights;
void    ActorShadow_DrawCircle(Actor* actor, Lights* lights, PlayState* play);
void    ActorShadow_DrawSquare(Actor* actor, Lights* lights, PlayState* play);

void    Actor_Kill(Actor* actor);
int     Actor_HasParent(Actor* actor, PlayState* play);
int     Actor_HasParentZ(Actor* actor);
int     Actor_HasNoParent(Actor* actor, PlayState* play);
int     Actor_HasNoParentZ(Actor* actor);
void    Actor_SetScale(Actor* actor, float scale);
void    Actor_SetFocus(Actor* actor, float height);
void    Actor_OfferCarry(Actor* actor, PlayState* play);
void    ActorEnableTalk(Actor* actor, PlayState* play, float range);
void    ActorEnableTalkEx(Actor* actor, PlayState* play, float range, u32 unk);
void    Actor_UpdateBgCheckInfo(PlayState* play, Actor* actor, float unk_3, float unk_4, float unk_5, u32 unk_6);
void    Actor_MoveWithGravity(Actor* actor);
#define Actor_MoveXZGravity Actor_MoveWithGravity

int     ActorTalkedTo(Actor* actor);

void    EnableOwl(u8 owlId);

u32     Flags_GetTreasure(PlayState* play, int flag);
void    SetChestFlag(PlayState* play, int flag);
u32     Flags_GetCollectible(PlayState* play, int flag);
void    Flags_SetCollectible(PlayState* play, int flag);
u32     Flags_GetSwitch(PlayState* play, int flag);
u32     Flags_SetSwitch(PlayState* play, int flag);
void    ClearSwitchFlag(PlayState* play, int flag);
void    SetRoomClear(PlayState* play, int flag);
u32     GetRoomClearFlag(PlayState* play, int flag);
s32     Flags_GetClear(PlayState* play, s32 roomNumber);


void Sleep_Usec(u32 delay);

void Audio_PlayFanfare(int fanfareId);

void Actor_ProcessInitChain(Actor* this, void* data);

void DMARomToRam(u32 romAddr, void* dramAddr, u32 size);
void DmaCompressed(u32 pstart, void* dst, u32 size);
#if defined(GAME_OOT)
void _DmaCompressed(u32 pstart, void* dst, u32 size);
#endif
s32 RequestDma(DmaRequest* request, void* vramStart, u32 vromStart, size_t size, u32 unused, OSMesgQueue* queue, OSMesg msg);

void ConvertMatrix(const float* in, u16* out);
void MatrixRotation(u16 angle, int unk_1);

void DisplayTextBox(PlayState* play, u16 textId);
void DisplayTextBox2(PlayState* play, u16 textId);
void DisplayTextBox3(PlayState* play, Actor* actor, u16 textId);

void DrawLink(PlayState* play, void** skeleton, Vec3s* jointTable, s32 dListCount, s32 lod, s32 tunic, s32 boots, s32 face, void* overrideLimbDraw, void* postLimbDraw, void* data);

int Actor_OfferGetItem(Actor* actor, PlayState* play, s16 itemId, float a, float b);
void GiveItemDefaultRange(Actor* actor, PlayState* play, s16 itemId);

void PlayerDisplayTextBox(PlayState* play, u16 messageId, void* unk);

#if defined(GAME_MM)
void Message_ShowMessageAtYPosition(PlayState* play, u16 messageId, u8 yPosition);
void PictoUpdateFlags(PlayState* play);
extern u16 gPictoboxState;
extern u16 gPictoboxPhotoTaken;
#endif

#define TEXT_STATE_NONE         0
#define TEXT_STATE_CLOSING      2
#define TEXT_STATE_DONE_FADING  3

#if defined(GAME_OOT)
int  Message_GetState(MessageContext* ctx);
#else
int  Message_GetState(void* ctx);
#endif

void Message_Close(PlayState* play);
int  Message_ShouldAdvance(PlayState* play);
int  Message_IsClosed(Actor* actor, PlayState* play);

void OcarinaAction(PlayState *play, u16 ocarinaAction);
void OcarinaAction2(PlayState *play, u16 ocarinaAction);

extern float* gModelView;

void Collider_UpdateSpheres(s32 limb, ColliderJntSph* jntSph);
void ModelViewUnkTransform(MtxF* unk);
void ModelViewMult(MtxF* mf, s32 mode);
void Matrix_SetTranslateRotateYXZ(f32 translateX, f32 translateY, f32 translateZ, Vec3s* rot);
Mtx* Matrix_Finalize(GraphicsContext* gfxCtx);
void Matrix_MultVec3f(Vec3f* src, Vec3f* dest);

void SpawnSomeDust(PlayState* play, Vec3f* pos, float unk1, int unk2, int unk3, int unk4, int unk5);

f32 Rand_CenteredFloat(f32 scale);

int GetActiveItem(PlayState* play);

#if defined(GAME_MM)
void AddMagic(PlayState* play, s16 amount);
#endif

u8 AddItem(PlayState* play, u8 itemId);
u8 AddItemWithIcon(PlayState* play, Player* link, const GetItem* giEntry);
u8 GetItemCollectBehavior(s16 itemId);
void Interface_SetDoAction(PlayState* play, u16 action);
void Interface_LoadActionLabelB(PlayState* play, u16 action);

#if defined(GAME_MM)
void PrepareSave(SramContext* sram);
void _Sram_SaveEndOfCycle(PlayState* play);
void Sram_SaveEndOfCycle(PlayState* play);
void Sram_ClearFlagsAtDawnOfTheFirstDay(void);
void Sram_SaveNewDay(PlayState* play);
#endif

void Grayscale(void* buffer, u16 size);

extern u32 gSegments[16];

#define SEGMENTED_TO_VIRTUAL(addr)  (void*)(gSegments[SEGMENT_NUMBER(addr)] + SEGMENT_OFFSET(addr) + K0BASE)

#define GET_PLAYER(play) ((Player*)(play->actorCtx.actors[2].first))

int  ActorCutscene_GetCanPlayNext(int cutscene);
s16  ActorCutscene_GetCurrentIndex(void);
void ActorCutscene_Stop(s16 cutsceneId);
void Cutscene_End(PlayState* play, void* unk);

void RemoveItem(s16 item, s16 slot);

void* ActorAlloc(u32 size);
void  ActorFree(void* data);

#if defined(GAME_MM)
void Sram_OpenSave(void*, void*);
void Sram_CopySave(void*, void*);
#endif

extern const u32 kRupeeColor[];
extern const u8 kRupeeDigits[];

int Wallet_IndexOot(void);
int Wallet_IndexMm(void);

#if defined(GAME_MM)
void func_8012CF0C(GraphicsContext* gfxCtx, int flagUnk0, int flagUnk1, int r, int g, int b);
#endif

void Play_Init(PlayState*);
void Play_Main(PlayState*);
void Play_DrawMain(PlayState*);

void Interface_LoadItemIconImpl(PlayState* play, int slot);
void UpdateEquipment(PlayState* play, Player* link);

void PlayStoreFlags(PlayState* play);
Camera* Play_GetCamera(PlayState* this, s16 camId);
s32 Play_CamIsNotFixed(PlayState* play);

void Play_SetupRespawnPoint(PlayState* this, int respawnMode, int playerParams);
void Play_SetupRespawnPointRaw(PlayState* this, int respawnMode, int playerParams);
void Play_SetRespawnData(PlayState *play, s32 respawnMode, u16 entrance, s32 roomIndex, s32 playerParams, const Vec3f* pos, s16 yaw);

void* OverlayAddr(u32 addr);
void KaleidoManager_LoadOvl(void* ovl);

void LoadIcon(u32 vaddr, int iconId, void* buffer, int size);
void CmpDma_LoadAllFiles(u32 vrom, void* dst, size_t size);

void PlaySound(u16 soundId);
void PlayMusic(int arg0, int arg1, int arg2, int arg3, int arg4);
void Actor_PlaySfx(Actor* actor, u32 id);
void Actor_PlaySfx_Flagged(Actor* actor, u16 sfxId);
void Actor_PlaySfx_FlaggedCentered1(Actor* actor, u16 sfxId);
void PlayLoopingSfxAtActor(Actor* actor, u32 id);
void Audio_PlaySfx_AtPos(Vec3f* pos, u16 sfxId);
void Audio_PlaySfx_MessageDecide(void);
void AudioSfx_PlaySfx(u16 sfxId, Vec3f* pos, u8 token, f32* freqScale, f32* volume, s8* reverbAdd);

void* Lib_SegmentedToVirtual(void* ptr);

typedef void (*ActorShadowFunc)(Actor*, Lights*, PlayState*);
void ActorShape_Init(ActorShape* actorShape, f32 yOffset, ActorShadowFunc shadowDraw, f32 shadowScale);
void Animation_PlayLoop(SkelAnime* skelAnime, AnimationHeader* animation);
void Animation_PlayOnce(SkelAnime* skelAnime, AnimationHeader* animation);
void Animation_PlayLoop(SkelAnime* skelAnime, AnimationHeader* animation);
void Animation_Change(SkelAnime* skelAnime, AnimationHeader* animation, f32 playSpeed, f32 startFrame, f32 endFrame, u8 mode, f32 morphFrames);
void Animation_ChangeImpl(SkelAnime* skelAnime, AnimationHeader* animation, f32 playSpeed, f32 startFrame, f32 endFrame, u8 mode, f32 morphFrames, s8 taper);
void Animation_PlayOnceSetSpeed(SkelAnime* skelAnime, AnimationHeader* animation, f32 playSpeed);
void Animation_MorphToPlayOnce(SkelAnime* skelAnime, AnimationHeader* animation, f32 morphFrames);
void Animation_PlayLoopSetSpeed(SkelAnime* skelAnime, AnimationHeader* animation, f32 playSpeed);
void Animation_MorphToLoop(SkelAnime* skelAnime, AnimationHeader* animation, f32 morphFrames);

void Animation_EndLoop(SkelAnime* skelAnime);
void Animation_Reverse(SkelAnime* skelAnime);
void Animation_SetMorph(struct PlayState* play, SkelAnime* skelAnime, f32 morphFrames);
s32 Animation_OnFrame(SkelAnime* skelAnime, f32 frame);
s16 Animation_GetLength(void* animation);
s16 Animation_GetLastFrame(void* animation);

#if defined(GAME_MM)
void AudioOcarina_SetInstrument(u8 ocarinaInstrumentId);
s32 Collider_InitAndSetCylinder(PlayState* play, ColliderCylinder* collider, Actor* actor, ColliderCylinderInit* src);
void Message_BombersNotebookQueueEvent(PlayState* play, u8 event);
s32 Player_IsFacingActor(Actor* actor, s16 maxAngleDiff, PlayState* play);
s32 Actor_TrackPlayer(PlayState* play, Actor* actor, Vec3s* headRot, Vec3s* torsoRot, Vec3f focusPos);
s16 Animation_GetLastFrame(void* animation);
s8 Play_InCsMode(PlayState* this);

s32 Player_SetCsActionWithHaltedActors(PlayState* play, Actor* csActor, u8 csAction);
s32 Actor_TalkOfferAccepted(Actor* actor, GameState* gameState);
s32 Actor_OfferTalkExchange(Actor* actor, PlayState* play, f32 xzRange, f32 yRange, PlayerItemAction exchangeItemAction);
s32 Actor_OfferTalk(Actor* actor, PlayState* play, f32 radius);
s32 Actor_TextboxIsClosing(Actor* actor, PlayState* play);
#endif

int Actor_RunByteCode(Actor* this, PlayState* play, void* bytecode, void* unk1, void* unk2);
void Enemy_StartFinishingBlow(PlayState* play, Actor* this);

void DeathWarp(PlayState* play);

#if defined(GAME_MM)
void DrawDungeonUnk2(void* unk);
#endif

void ActorRemove(ActorContext* ctx, Actor* actor, PlayState* play);

s16 RupeeValueOot(s16 count);
s16 RupeeValueMm(s16 count);
void AddRupeesRaw(s16 delta);
void AddRupees(s16 delta);
void _AddRupees(s16 delta);

void AudioLoad_InitTable(void* unk1, u32 unk2, u32 unk3);

void ParseSceneRoomHeaders_SoundSettings(PlayState* play, void* cmd);

void Interface_StartMoonCrash(PlayState* play);

void SpawnRoomActors(PlayState* play, int id);
void SpawnTransitionActors(PlayState* play, int id);

extern u8 gPlayedOcarinaSong;
extern u8 gIsOcarinaEnabled;
extern u32 gOcarinaFlags;
extern u8 gOcarinaButtonPitchMap[];
extern u8 gOcarinaSongBuffer[];
extern u8 gOcarinaSongBufferCursor;

void HandleMessages(PlayState* play, void* unk);

#if defined(GAME_OOT)
void func_800C7200(u8 arg0);
void Letterbox_SetSizeTarget(s32 target);
u32 Letterbox_GetSizeTarget(void);
#endif

void Play_LoadKaleidoOverlay(void*);
void LoadMapMark(void*);

#define TINGLE_MAP_CLOCK_TOWN       0
#define TINGLE_MAP_WOODFALL         1
#define TINGLE_MAP_SNOWHEAD         2
#define TINGLE_MAP_ROMANI_RANCH     3
#define TINGLE_MAP_GREAT_BAY        4
#define TINGLE_MAP_STONE_TOWER      5
void Inventory_SetWorldMapCloudVisibility(s16 tingleId);

#endif

void Font_LoadOrderedFont(Font* font);

void Horse_ForceUnmount(PlayState* play);
void Horse_Spawn(PlayState* play, Player* link);
void Horse_SpawnOverworld(PlayState* play, Player* link);

#if defined(GAME_MM)
extern int gHorseIsMounted;
s16 ActorCutscene_StartAndSetFlag(s16 index, Actor* actor);
#endif

void DrawHUD(PlayState* play);

int IsSceneValidEpona(int sceneId);

s32 Health_ChangeBy(PlayState* play, s16 amount);
void Interface_SetBButtonInterfaceDoAction(PlayState* play, s16 bButtonDoAction);

typedef struct ObjectContext ObjectContext;
int Object_SpawnPersistent(ObjectContext* objectCtx, s16 id);
int Object_GetSlot(ObjectContext* objectCtx, s16 id);
int _Object_GetSlot(ObjectContext* objectCtx, s16 id);
int Object_IsLoaded(ObjectContext* ctx, int slot);
int _Object_IsLoaded(ObjectContext* ctx, int slot);

typedef struct Actor_EnItem00 Actor_EnItem00;

void PreDraw1(Actor* actor, PlayState* play, int unk);
void PreDraw2(Actor* actor, PlayState* play, int unk);

#if defined(GAME_OOT)
Actor* ActorFind(void* actorCtx, s32 actorId, s32 actorCategory);
void Play_InitEnvironment(PlayState *play, u16 skyboxId);
extern u8 gFogState;
void func_800C4F94(Vec3f* pos, u8 level);
#endif

#if defined(GAME_MM)
int Item_CollectibleDropTable(u32 index);
int Item_CollectibleDropTable2(u32 index);
#endif

Actor_EnItem00* Item_DropCollectible(PlayState* play, const Vec3f* pos, s16 params);
void Item_DropCollectibleRandom(PlayState* play, Actor* from, const Vec3f* pos, s16 params);
int Item_CanDropBigFairy(PlayState* play, s32 index, s32 collectibleFlag);

s16 Math_Vec3f_Yaw(Vec3f* origin, Vec3f* point);
MtxF* Matrix_GetCurrent(void);

#if defined(GAME_MM)
f32 VectDist(Vec3f* vec1, Vec3f* vec2);
f32 Math_Vec3f_DistXYZ(Vec3f* a, Vec3f* b);
f32 Math_Vec3f_DistXYZAndStoreDiff(Vec3f* a, Vec3f* b, Vec3f* dest);
void Audio_PlaySfx_AtPosWithAllChannelsIO(Vec3f* pos, u16 sfxId, u8 ioData);
void EffectSsDust_Spawn_2_Normal(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, Color_RGBA8* primColor, Color_RGBA8* envColor, s16 scale, s16 scaleStep, s16 life);

void Matrix_MultVec3f(Vec3f* src, Vec3f* dest);
#endif

void SkelAnime_InitFlex(PlayState* play, SkelAnime* skelAnime, FlexSkeletonHeader* skeletonHeaderSeg, AnimationHeader* animation, Vec3s* jointTable, Vec3s* morphTable, s32 limbCount);

s32     SkelAnime_Update(SkelAnime* skelAnime);
void    Animation_Change(SkelAnime* skelAnime, AnimationHeader* animation, f32 playSpeed, f32 startFrame, f32 endFrame, u8 mode, f32 morphFrames);

void EffectSsIceSmoke_Spawn(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, s16 scale);
void EffectSsKiraKira_SpawnDispersed(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, Color_RGBA8* primColor, Color_RGBA8* envColor, s16 scale, s32 life);
void Actor_SpawnIceEffects(PlayState* play, Actor* actor, Vec3f bodyPartsPos[], s32 bodyPartsCount, s32 effectsPerBodyPart, f32 scale, f32 scaleRange);

s32 PlayerAnimation_Update(PlayState* play, SkelAnime* skelAnime);
void PlayerAnimation_PlayOnce(PlayState* play, SkelAnime* skelAnime, PlayerAnimationHeader* animation);
void PlayerAnimation_PlayOnceSetSpeed(PlayState* play, SkelAnime* skelAnime, PlayerAnimationHeader* animation, f32 playSpeed);
void PlayerAnimation_PlayLoopSetSpeed(PlayState* play, SkelAnime* skelAnime, PlayerAnimationHeader* animation, f32 playSpeed);
s32 PlayerAnimation_OnFrame(SkelAnime* skelAnime, f32 frame);

s16     Camera_SetFinishedFlag(Camera* camera);
s32     Camera_ChangeSetting(Camera* camera, s16 setting);
Vec3s   Camera_GetCamDir(Camera* camera);
s16     Camera_GetCamDirPitch(Camera* camera);
s16     Camera_GetCamDirYaw(Camera* camera);
void    Camera_SetCameraData(Camera* camera, s16 setDataFlags, void* data0, void* data1, s16 data2, s16 data3, s32 arg6);
s32     Camera_RequestQuake(Camera* camera, s32 unused, s16 y, s32 duration);

s32 Collider_InitCylinder(struct PlayState* play, ColliderCylinder* collider);
s32 Collider_SetCylinder(struct PlayState* play, ColliderCylinder* collider, struct Actor* actor, ColliderCylinderInit* src);
void Collider_UpdateCylinder(struct Actor* actor, ColliderCylinder* collider);
void Map_SetAreaEntrypoint(PlayState* play);

typedef s32 (*OverrideCurveLimbDraw)(struct PlayState* play, SkelCurve* skelCuve, s32 limbIndex, struct Actor* actor);
typedef void (*PostCurveLimbDraw)(struct PlayState* play, SkelCurve* skelCuve, s32 limbIndex, struct Actor* actor);

s32 SkelCurve_Init(PlayState* play, SkelCurve* skelCurve, CurveSkeletonHeader* skeletonHeaderSeg, CurveAnimationHeader* animation);
void SkelCurve_Destroy(struct PlayState* play, SkelCurve* skelCurve);
void SkelCurve_SetAnim(SkelCurve* skelCurve, CurveAnimationHeader* animation, f32 arg2, f32 endFrame, f32 curFrame, f32 playSpeed);
s32 SkelCurve_Update(struct PlayState* play, SkelCurve* skelCurve);
void SkelCurve_Draw(Actor* actor, struct PlayState* play, SkelCurve* skelCurve, OverrideCurveLimbDraw overrideLimbDraw, PostCurveLimbDraw postLimbDraw, s32 lod, Actor* thisx);

typedef int (*OverrideLimbDrawOpa)(struct PlayState* play, s32 limbIndex, Gfx** dList, Vec3f* pos, Vec3s* rot, void*);
typedef void (*PostLimbDrawOpa)(struct PlayState* play, s32 limbIndex, Gfx** dList, Vec3s* rot, void*);

void SkelAnime_Init(PlayState* play, SkelAnime* skelAnime, SkeletonHeader* skeletonHeaderSeg, AnimationHeader* animation, Vec3s* jointTable, Vec3s* morphTable, s32 limbCount);
void SkelAnime_DrawOpa(PlayState* play, void** skeleton, Vec3s* jointTable, void* overrideLimbDraw, void* postLimbDraw, void* arg);
void SkelAnime_DrawFlexOpa(PlayState* play, void** skeleton, Vec3s* jointTable, s32 dListCount, void* overrideLimbDraw, void* postLimbDraw, void* arg);
void SkelAnime_DrawFlexLod(PlayState* play, void** skeleton, Vec3s* jointTable, s32 dListCount, void* overrideLimbDraw, void* postLimbDraw, Actor* actor, s32 lod);

void Actor_DrawLensActors(PlayState* play, s32 numLensActors, Actor** lensActors);
ActorProfile* Actor_LoadOverlay(ActorContext* actorCtx, s16 index);

s32 Entrance_GetSceneIdAbsolute(u16 entrance);

/* SysFlashrom */
s32 SysFlashrom_IsInit(void);
s32 SysFlashrom_InitFlash(void);
s32 SysFlashrom_EraseSector(u32 page);
s32 SysFlashrom_ReadData(void* addr, u32 pageNum, u32 pageCount);
s32 SysFlashrom_ExecWrite(void* addr, u32 pageNum, u32 pageCount);

EntranceTableEntry* Entrance_GetTableEntry(u16 entrance);

extern u8 gWeatherMode;

#if defined(GAME_MM)
# define func_800A8150 Item_CollectibleDropTable
void SkinMatrix_Vec3fMtxFMultXYZW(MtxF* mf, Vec3f* src, Vec3f* xyzDest, f32* wDest);
void func_800B1210(struct PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, s16 scale, s16 scaleStep);
#endif

s32 WaterBox_GetSurfaceImpl(struct PlayState* play, CollisionContext* colCtx, f32 x, f32 z, f32* ySurface, WaterBox** outWaterBox, s32* bgId);

/* Gamemodes */
void FileSelect_Init(GameState* this);

void Rumble_Request(f32 distSq, u8 sourceIntensity, u8 decayTimer, u8 decayStep);
Actor* Actor_SpawnAsChild(ActorContext* actorCtx, Actor* parent, PlayState* play, s16 actorId, f32 posX, f32 posY, f32 posZ, s16 rotX, s16 rotY, s16 rotZ, s32 params);

s32 SurfaceType_GetWallFlags(CollisionContext* colCtx, CollisionPoly* poly, s32 bgId);
s32 SurfaceType_IsIgnoredByProjectiles(CollisionContext* colCtx, CollisionPoly* poly, s32 bgId);
s32 DynaPolyActor_TransformCarriedActor(CollisionContext* colCtx, s32 bgId, Actor* carriedActor);
s32 WaterBox_GetSurface1(PlayState* play, CollisionContext* colCtx, f32 x, f32 z, f32* ySurface, WaterBox** outWaterBox);
f32 Math3D_Vec3fMagnitude(Vec3f* vec);


#if defined(GAME_MM)
extern u8 gSceneSeqState;
extern Vec3f gZeroVec3f;

Actor* SubS_FindActor(PlayState* play, Actor* actorListStart, u8 actorCategory, s16 actorId);
void SubS_TimePathing_FillKnots(f32 knots[], s32 order, s32 numPoints);
s32 SubS_TimePathing_Update(Path* path, f32* progress, s32* elapsedTime, s32 waypointTime, s32 totalTime, s32* waypoint, f32 knots[], Vec3f* targetPos, s32 timeSpeed);
s16 CutsceneManager_GetCurrentCsId(void);
void Environment_StartTime(void);
void Environment_StopTime(void);
void Audio_PlaySfx_MessageCancel(void);
void Audio_PlaySfx_MessageDecide(void);
void DynaPolyActor_LoadMesh(PlayState* play, DynaPolyActor* dynaActor, CollisionHeader* meshHeader);
Path* SubS_GetAdditionalPath(PlayState* play, u8 pathIndex, s32 limit);
void Math_Vec3s_ToVec3f(Vec3f* dest, Vec3s* src);
void Interface_InitMinigame(PlayState* play);

s32 DynaPolyActor_IsPlayerOnTop(DynaPolyActor* dynaActor);
void DynaPolyActor_Init(DynaPolyActor* dynaActor, s32 transformFlags);

void AudioSeq_QueueSeqCmd(u32 cmd);
void DayTelop_Init(PlayState* play);
void Audio_PlaySfx(u16 sfxId);
void Audio_PlaySfx_2(u16 sfxId);

void Message_DisplaySceneTitleCard(PlayState* play, u16 textId);
void Sram_IncrementDay(void);
s32 Play_IsDebugCamEnabled(void);
u16 Entrance_CreateFromSpawn(s32 spawn);
void Audio_PlaySfx_BigBells(Vec3f* pos, u8 volumeIndex);
s16 CutsceneManager_IsNext(s16 csId);
void CutsceneManager_Queue(s16 csId);
s16 CutsceneManager_Start(s16 csId, Actor* actor);
s16 CutsceneManager_Stop(s16 csId);
s16 CutsceneManager_GetCutsceneScriptIndex(s16 csId);
s16 CutsceneManager_GetCutsceneCustomValue(s16 csId);
CutsceneEntry* CutsceneManager_GetCutsceneEntry(s16 csId);

void Actor_ChangeCategory(PlayState* play, ActorContext* actorCtx, Actor* actor, u8 actorCategory);
void Animation_MorphToLoop(SkelAnime* skelAnime, AnimationHeader* animation, f32 morphFrames);
void Animation_MorphToPlayOnce(SkelAnime* skelAnime, AnimationHeader* animation, f32 morphFrames);
s32 Animation_OnFrame(SkelAnime* skelAnime, f32 frame);

s32 Collider_InitAndSetJntSph(PlayState* play, ColliderJntSph* sphereGroup, Actor* actor, ColliderJntSphInit* src, ColliderJntSphElement* elements);
void Cutscene_StartManual(PlayState* play, CutsceneContext* csCtx);
void Cutscene_StopManual(PlayState* play, CutsceneContext* csCtx);

void Matrix_MultVecZ(f32 z, Vec3f* dest);
void Matrix_MultVecY(f32 y, Vec3f* dest);
void Matrix_MultZero(Vec3f* dest);
void Matrix_RotateXFApply(f32 x);
void Matrix_ReplaceRotation(MtxF* mf);
void Matrix_RotateXFNew(f32 x);
void Matrix_Put(MtxF* src);

s16 Play_CreateSubCamera(PlayState* this);
s32 Play_ChangeCameraStatus(PlayState* this, s16 camId, s16 status);
s32 Play_SetCameraAtEye(PlayState* this, s16 camId, Vec3f* at, Vec3f* eye);
s32 Play_SetCameraAtEyeUp(PlayState* this, s16 camId, Vec3f* at, Vec3f* eye, Vec3f* up);
Gfx* Play_SetFog(PlayState* this, Gfx* gfx);

void Rumble_Override(f32 distSq, u8 sourceIntensity, u8 decayTimer, u8 decayStep);

void TitleCard_InitBossName(GameState* gameState, TitleCardContext* titleCtx, void* texture, s16 x, s16 y, u8 width, u8 height);
void ShrinkWindow_Letterbox_SetSizeTarget(s32 target);

void EffectSsKFire_Spawn(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, s16 scaleMax, u8 type);
void EffectSsEnIce_Spawn(PlayState* play, Vec3f* pos, f32 scale, Vec3f* velocity, Vec3f* accel, Color_RGBA8* primColor, Color_RGBA8* envColor, s32 life);
void func_800B12F0(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, s16 scale, s16 scaleStep, s16 life);
void func_800B0DE0(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, Color_RGBA8* primColor, Color_RGBA8* envColor, s16 scale, s16 scaleStep);

void SoundSource_InitAll(PlayState* play);
void SoundSource_UpdateAll(PlayState* play);
void SoundSource_PlaySfxAtFixedWorldPos(PlayState* play, Vec3f* worldPos, u32 duration, u16 sfxId);
void SoundSource_PlaySfxEachFrameAtFixedWorldPos(PlayState* play, Vec3f* worldPos, u32 duration, u16 sfxId);

Gfx* Gfx_TwoTexScroll(GraphicsContext* gfxCtx, s32 tile1, u32 x1, u32 y1, s32 width1, s32 height1, s32 tile2, u32 x2, u32 y2, s32 width2, s32 height2);
Gfx* Gfx_SetFog(Gfx* gfx, s32 r, s32 g, s32 b, s32 a, s32 n, s32 f);
void Gfx_SetupDL25_Xlu(GraphicsContext* gfxCtx);
void Gfx_SetupDL44_Xlu(GraphicsContext* gfxCtx);
Gfx* Gfx_SetupDL71(Gfx* gfx);
Gfx* Gfx_SetupDL72(Gfx* gfx);

s16 CutsceneManager_GetAdditionalCsId(s16 csId);
void PlayerAnimation_Change(PlayState* play, SkelAnime* skelAnime, PlayerAnimationHeader* animation, f32 playSpeed, f32 startFrame, f32 endFrame, u8 mode, f32 morphFrames);
s32 Actor_IsFacingPlayer(Actor* actor, s16 angle);
void Actor_PlaySeq_FlaggedKamaroDance(Actor* actor);
s16 CutsceneManager_StartWithPlayerCs(s16 csId, Actor* actor);
void Scene_SetRenderModeXlu(PlayState* play, s32 index, u32 flags);

typedef s32 (*OverrideLimbDraw)(PlayState* play, s32 limbIndex, Gfx** dList, Vec3f* pos, Vec3s* rot,
                                Actor* thisx, Gfx** gfx);

typedef void (*PostLimbDraw)(PlayState* play, s32 limbIndex, Gfx** dList, Vec3s* rot,
                             Actor* thisx, Gfx** gfx);

f32 Math3D_Vec3f_DistXYZ(Vec3f* a, Vec3f* b);
void Actor_UpdateVelocityWithGravity(Actor* actor);
void Math_Vec3f_Scale(Vec3f* vec, f32 scale);
s16 Quake_Request(Camera* camera, u32 type);
u32 Quake_SetSpeed(s16 index, s16 speed);
u32 Quake_SetPerturbations(s16 index, s16 y, s16 x, s16 fov, s16 roll);
u32 Quake_SetDuration(s16 index, s16 duration);
f32 BgCheck_EntityRaycastFloor5_2(PlayState* play, CollisionContext* colCtx, CollisionPoly** outPoly, s32* bgId, Actor* actor, Vec3f* pos);
s32 WaterBox_GetSurface1_2(PlayState* play, CollisionContext* colCtx, f32 x, f32 z, f32* ySurface, WaterBox** outWaterBox);
void EffectSsHahen_Spawn(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, s16 flags, s16 scale, s16 objectId, s16 life, Gfx* dList);
s16 CutsceneManager_GetCurrentSubCamId(s16 csId);
u32 Quake_RemoveRequest(s16 index);

f32 Math3D_Vec3fMagnitudeSq(Vec3f* vec);
void Math3D_Vec3f_Cross(Vec3f* a, Vec3f* b, Vec3f* ret);
void Matrix_Get(MtxF* dest);
void Matrix_MtxFToYXZRot(MtxF* src, Vec3s* dest, s32 nonUniformScale);
void Effect_Add(PlayState* play, s32* pIndex, int type, u8 arg3, u8 arg4, void* initParams);
void Effect_Destroy(PlayState* play, s32 index);
int SurfaceType_GetFloorType(CollisionContext* colCtx, CollisionPoly* poly, s32 bgId);
void* Effect_GetByIndex(s32 index);

#define MATRIX_FINALIZE_AND_LOAD(pkt, gfxCtx) \
    gSPMatrix(pkt, Matrix_Finalize(gfxCtx), G_MTX_NOPUSH | G_MTX_LOAD | G_MTX_MODELVIEW)

extern Gfx gSetupDLs[73][6]; // FIXME SETUPDL_MAX

s32 Camera_AddQuake(Camera* camera, s32 arg1, s16 y, s32 countdown);
s16 CutsceneManager_StartWithPlayerCsAndSetFlag(s16 csId, Actor* actor);

typedef enum {
    ENTR_SCENE_MAYORS_RESIDENCE,
    ENTR_SCENE_MAJORAS_LAIR,
    ENTR_SCENE_MAGIC_HAGS_POTION_SHOP,
    ENTR_SCENE_RANCH_HOUSE,
    ENTR_SCENE_HONEY_AND_DARLINGS_SHOP,
    ENTR_SCENE_BENEATH_THE_GRAVERYARD,
    ENTR_SCENE_SOUTHERN_SWAMP_CLEARED,
    ENTR_SCENE_CURIOSITY_SHOP,
    ENTR_SCENE_UNSET_08,
    ENTR_SCENE_UNSET_09,
    ENTR_SCENE_GROTTOS,
    ENTR_SCENE_UNSET_0B,
    ENTR_SCENE_UNSET_0C,
    ENTR_SCENE_UNSET_0D,
    ENTR_SCENE_CUTSCENE,
    ENTR_SCENE_UNSET_0F,
    ENTR_SCENE_IKANA_CANYON,
    ENTR_SCENE_PIRATES_FORTRESS,
    ENTR_SCENE_MILK_BAR,
    ENTR_SCENE_STONE_TOWER_TEMPLE,
    ENTR_SCENE_TREASURE_CHEST_SHOP,
    ENTR_SCENE_STONE_TOWER_TEMPLE_INVERTED,
    ENTR_SCENE_CLOCK_TOWER_ROOFTOP,
    ENTR_SCENE_OPENING_DUNGEON,
    ENTR_SCENE_WOODFALL_TEMPLE,
    ENTR_SCENE_PATH_TO_MOUNTAIN_VILLAGE,
    ENTR_SCENE_IKANA_CASTLE,
    ENTR_SCENE_DEKU_SCRUB_PLAYGROUND,
    ENTR_SCENE_ODOLWAS_LAIR,
    ENTR_SCENE_TOWN_SHOOTING_GALLERY,
    ENTR_SCENE_SNOWHEAD_TEMPLE,
    ENTR_SCENE_MILK_ROAD,
    ENTR_SCENE_PIRATES_FORTRESS_INTERIOR,
    ENTR_SCENE_SWAMP_SHOOTING_GALLERY,
    ENTR_SCENE_PINNACLE_ROCK,
    ENTR_SCENE_FAIRY_FOUNTAIN,
    ENTR_SCENE_SWAMP_SPIDER_HOUSE,
    ENTR_SCENE_OCEANSIDE_SPIDER_HOUSE,
    ENTR_SCENE_ASTRAL_OBSERVATORY,
    ENTR_SCENE_MOON_DEKU_TRIAL,
    ENTR_SCENE_DEKU_PALACE,
    ENTR_SCENE_MOUNTAIN_SMITHY,
    ENTR_SCENE_TERMINA_FIELD,
    ENTR_SCENE_POST_OFFICE,
    ENTR_SCENE_MARINE_RESEARCH_LAB,
    ENTR_SCENE_DAMPES_HOUSE,
    ENTR_SCENE_UNSET_2E,
    ENTR_SCENE_GORON_SHRINE,
    ENTR_SCENE_ZORA_HALL,
    ENTR_SCENE_TRADING_POST,
    ENTR_SCENE_ROMANI_RANCH,
    ENTR_SCENE_TWINMOLDS_LAIR,
    ENTR_SCENE_GREAT_BAY_COAST,
    ENTR_SCENE_ZORA_CAPE,
    ENTR_SCENE_LOTTERY_SHOP,
    ENTR_SCENE_UNSET_37,
    ENTR_SCENE_PIRATES_FORTRESS_EXTERIOR,
    ENTR_SCENE_FISHERMANS_HUT,
    ENTR_SCENE_GORON_SHOP,
    ENTR_SCENE_DEKU_KINGS_CHAMBER,
    ENTR_SCENE_MOON_GORON_TRIAL,
    ENTR_SCENE_ROAD_TO_SOUTHERN_SWAMP,
    ENTR_SCENE_DOGGY_RACETRACK,
    ENTR_SCENE_CUCCO_SHACK,
    ENTR_SCENE_IKANA_GRAVEYARD,
    ENTR_SCENE_GOHTS_LAIR,
    ENTR_SCENE_SOUTHERN_SWAMP_POISONED,
    ENTR_SCENE_WOODFALL,
    ENTR_SCENE_MOON_ZORA_TRIAL,
    ENTR_SCENE_GORON_VILLAGE_SPRING,
    ENTR_SCENE_GREAT_BAY_TEMPLE,
    ENTR_SCENE_WATERFALL_RAPIDS,
    ENTR_SCENE_BENEATH_THE_WELL,
    ENTR_SCENE_ZORA_HALL_ROOMS,
    ENTR_SCENE_GORON_VILLAGE_WINTER,
    ENTR_SCENE_GORON_GRAVERYARD,
    ENTR_SCENE_SAKONS_HIDEOUT,
    ENTR_SCENE_MOUNTAIN_VILLAGE_WINTER,
    ENTR_SCENE_GHOST_HUT,
    ENTR_SCENE_DEKU_SHRINE,
    ENTR_SCENE_ROAD_TO_IKANA,
    ENTR_SCENE_SWORDMANS_SCHOOL,
    ENTR_SCENE_MUSIC_BOX_HOUSE,
    ENTR_SCENE_IGOS_DU_IKANAS_LAIR,
    ENTR_SCENE_TOURIST_INFORMATION,
    ENTR_SCENE_STONE_TOWER,
    ENTR_SCENE_STONE_TOWER_INVERTED,
    ENTR_SCENE_MOUNTAIN_VILLAGE_SPRING,
    ENTR_SCENE_PATH_TO_SNOWHEAD,
    ENTR_SCENE_SNOWHEAD,
    ENTR_SCENE_PATH_TO_GORON_VILLAGE_WINTER,
    ENTR_SCENE_PATH_TO_GORON_VILLAGE_SPRING,
    ENTR_SCENE_GYORGS_LAIR,
    ENTR_SCENE_SECRET_SHRINE,
    ENTR_SCENE_STOCK_POT_INN,
    ENTR_SCENE_GREAT_BAY_CUTSCENE,
    ENTR_SCENE_CLOCK_TOWER_INTERIOR,
    ENTR_SCENE_WOODS_OF_MYSTERY,
    ENTR_SCENE_LOST_WOODS,
    ENTR_SCENE_MOON_LINK_TRIAL,
    ENTR_SCENE_THE_MOON,
    ENTR_SCENE_BOMB_SHOP,
    ENTR_SCENE_GIANTS_CHAMBER,
    ENTR_SCENE_GORMAN_TRACK,
    ENTR_SCENE_GORON_RACETRACK,
    ENTR_SCENE_EAST_CLOCK_TOWN,
    ENTR_SCENE_WEST_CLOCK_TOWN,
    ENTR_SCENE_NORTH_CLOCK_TOWN,
    ENTR_SCENE_SOUTH_CLOCK_TOWN,
    ENTR_SCENE_LAUNDRY_POOL,
    ENTR_SCENE_MAX
} EntranceSceneId;

#define ENTRANCE(scene, spawn) ((((ENTR_SCENE_##scene) & 0x7F) << 9) | (((spawn) & 0x1F) << 4))

// TODO: rename
void func_800BE5CC(Actor* actor, ColliderJntSph* jntSph, s32 elemIndex);
void func_800AE930(CollisionContext* colCtx, void* this, Vec3f* pos, f32 arg3, s16 angle, CollisionPoly* colPoly, s32 bgId);
void func_800AEF44(void* this);
void func_80169EFC(PlayState* play);
void func_800B0EB0(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, Color_RGBA8* primColor, Color_RGBA8* envColor, s16 scale, s16 scaleStep, s16 life);
void func_80169AFC(PlayState* play, s16 camId, s16 timer);
void func_800B8D50(PlayState* play, Actor* actor, f32 arg2, s16 yaw, f32 arg4, u32 arg5);
void func_800B4AEC(PlayState* play, Actor* actor, f32 y);
void func_800B3030(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, s16 scale, s16 scaleStep, s32 colorIndex);
void func_800B0E48(PlayState* play, Vec3f* pos, Vec3f* velocity, Vec3f* accel, Color_RGBA8* primColor, Color_RGBA8* envColor, s16 scale, s16 scaleStep);

/* Compute transform matrix mapping +y (up) to the collision poly's normal */
void func_800C0094(CollisionPoly* poly, f32 tx, f32 ty, f32 tz, MtxF* dest);

#endif

Gfx* SkelAnime_DrawFlex(PlayState* play, void** skeleton, Vec3s* jointTable, s32 dListCount, void* overrideLimbDraw, void* postLimbDraw, struct Actor* actor, Gfx* gfx);
void AnimatedMat_Draw(PlayState* play, void* arg);

void ComboPlay_SpawnExtraSigns(PlayState* play);
