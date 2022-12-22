#include <combo.h>
#include <combo/custom.h>

#define M_SQRT1_2 0.707106781186547524401

void Shader_Opa0_Xlu1(GameState_Play*, s16);
void Shader_Opa0_Xlu12(GameState_Play*, s16);
void Shader_Opa0(GameState_Play*, s16);
void Shader_Opa01(GameState_Play*, s16);
void Shader_Opa1023(GameState_Play*, s16);
void Shader_Opa10_Xlu2(GameState_Play*, s16);
void Shader_Opa10_Xlu234(GameState_Play*, s16);
void Shader_Opa10_Xlu32(GameState_Play*, s16);
void Shader_Opa10234567(GameState_Play*, s16);
void Shader_Xlu01(GameState_Play*, s16);
void Shader_BlueFire(GameState_Play*, s16);
void Shader_BombchuMask(GameState_Play*, s16);
void Shader_Compass(GameState_Play*, s16);
void Shader_DekuNut(GameState_Play*, s16);
void Shader_Fairy(GameState_Play*, s16);
void Shader_Fish(GameState_Play*, s16);
void Shader_GiantKnife(GameState_Play*, s16);
void Shader_GS(GameState_Play*, s16);
void Shader_Heart(GameState_Play*, s16);
void Shader_Medallion(GameState_Play*, s16);
void Shader_MirrorShield(GameState_Play*, s16);
void Shader_Poe(GameState_Play*, s16);
void Shader_Potion(GameState_Play*, s16);
void Shader_Rupee(GameState_Play*, s16);
void Shader_Scale(GameState_Play*, s16);
void Shader_SoldOut(GameState_Play*, s16);
void Shader_Spell(GameState_Play*, s16);
void Shader_MoonTear(GameState_Play*, s16);

static void color4(u8* r, u8* g, u8* b, u8* a, u32 color)
{
    *r = (color >> 24) & 0xff;
    *g = (color >> 16) & 0xff;
    *b = (color >> 8) & 0xff;
    *a = color & 0xff;
}

/* Custom Shaders */
void Shader_Xlu0(GameState_Play* play, s16 shaderId)
{
    const Shader* shader;

    shader = &kShaders[shaderId];
    OPEN_DISPS(play->gs.gfx);
    InitListPolyXlu(play->gs.gfx);
    gSPMatrix(POLY_XLU_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    gSPDisplayList(POLY_XLU_DISP++, shader->lists[0]);
    CLOSE_DISPS();
}

void Shader_CustomNote(GameState_Play* play, s16 shaderId)
{
    static const u32 kColors[] = {
        0x8000ffff /* Purple */,
        0x0000ffff /* Blue */,
        0x00ff00ff /* Green */,
        0xffff00ff /* Yellow */,
        0xff8000ff /* Orange */,
        0xff0000ff /* Red */,
    };

    const Shader* shader;
    float angle;
    u8 r;
    u8 g;
    u8 b;
    u8 a;

    shader = &kShaders[shaderId];
    angle = M_PI / 16;
    if (shader->lists[1] & 0x10)
        angle += M_PI;
    color4(&r, &g, &b, &a, kColors[shader->lists[1] & 0xf]);

    ModelViewRotateZ(angle, MAT_MUL);

    OPEN_DISPS(play->gs.gfx);
    InitListPolyXlu(play->gs.gfx);
    gSPMatrix(POLY_XLU_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    gDPSetEnvColor(POLY_XLU_DISP++, r, g, b, a);
    gSPDisplayList(POLY_XLU_DISP++, shader->lists[0]);
    CLOSE_DISPS();
}

void Shader_CustomHeartContainer(GameState_Play* play, s16 shaderId)
{
    static const u32 colors[] = {
        /* Normal */
        0xa0ffffff,
        0x0064ffff,
        0xff0064ff,
        0x640032ff,

        /* Double Defense */
        0xffff00ff,
        0xcccc00ff,
        0xffffffff,
        0xffffffff,
    };

    const Shader* shader;
    u8 r;
    u8 g;
    u8 b;
    u8 a;
    u32 c;

    shader = &kShaders[shaderId];
    c = shader->lists[0];

    OPEN_DISPS(play->gs.gfx);
    InitListPolyXlu(play->gs.gfx);
    gSPMatrix(POLY_XLU_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    color4(&r, &g, &b, &a, colors[c * 4 + 0]);
    gDPSetPrimColor(POLY_XLU_DISP++, 0, 0x80, r, g, b, a);
    color4(&r, &g, &b, &a, colors[c * 4 + 1]);
    gDPSetEnvColor(POLY_XLU_DISP++, r, g, b, a);
    gSPDisplayList(POLY_XLU_DISP++, shader->lists[1]);
    color4(&r, &g, &b, &a, colors[c * 4 + 2]);
    gDPSetPrimColor(POLY_XLU_DISP++, 0, 0x80, r, g, b, a);
    color4(&r, &g, &b, &a, colors[c * 4 + 3]);
    gDPSetEnvColor(POLY_XLU_DISP++, r, g, b, a);
    gSPDisplayList(POLY_XLU_DISP++, shader->lists[2]);
    CLOSE_DISPS();
}

#if defined(GAME_OOT)
static const u32 kMatTransformOffset = 0x11da0;
#else
static const u32 kMatTransformOffset = 0x187fc;
#endif

static void shaderFlameEffect(GameState_Play* play, int colorIndex)
{
#if defined(GAME_OOT)
    static const u32 kFlameDlist = 0x52a10;
#else
    static const u32 kFlameDlist = 0x7d590;
#endif

    static const float flameScale = 0.0055f;

    static const u32 kPrimColors[] = {
        0x00ffffc0,
        0xff00ffc0,
        0xff0000c0,
    };

    static const u32 kEnvColors[] = {
        0x0000ffc0,
        0xff0000c0,
        0xffff00c0,
    };

    u8 r;
    u8 g;
    u8 b;
    u8 a;

    OPEN_DISPS(play->gs.gfx);
    ModelViewUnkTransform((float*)((char*)play + kMatTransformOffset));
    ModelViewTranslate(0.f, -30.f, -15.f, MAT_MUL);
    ModelViewScale(flameScale * 1.7f, flameScale, flameScale, MAT_MUL);
    gSPSegment(POLY_XLU_DISP++, 0x08, GetSegment(play->gs.gfx, 0, 0, 0, 0x20, 0x40, 1, 0, (-play->gs.frameCount & 0x7f) << 2, 0x20, 0x80));
    gSPMatrix(POLY_XLU_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    color4(&r, &g, &b, &a, kPrimColors[colorIndex]);
    gDPSetPrimColor(POLY_XLU_DISP++, 0x80, 0x80, r, g, b, a);
    color4(&r, &g, &b, &a, kEnvColors[colorIndex]);
    gDPSetEnvColor(POLY_XLU_DISP++, r, g, b, a);
    gSPDisplayList(POLY_XLU_DISP++, 0x04000000 | kFlameDlist);
    CLOSE_DISPS();
}

static const u32 kNutStickPrimColors[] = {
    0xa06428ff,
    0xffffffff,
    0xffffbbff,
};
static const u32 kNutStickEnvColors[] = {
    0x280a00ff,
    0x505050ff,
    0xaaaa00ff,
};

void Shader_CustomStick(GameState_Play* play, s16 shaderId)
{
    const Shader* shader;
    u8 r;
    u8 g;
    u8 b;
    u8 a;

    shader = &kShaders[shaderId];

    OPEN_DISPS(play->gs.gfx);
    InitListPolyOpa(play->gs.gfx);
    gSPMatrix(POLY_OPA_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    color4(&r, &g, &b, &a, kNutStickPrimColors[shader->lists[1]]);
    gDPSetPrimColor(POLY_OPA_DISP++, 0, 0, r, g, b, a);
    color4(&r, &g, &b, &a, kNutStickEnvColors[shader->lists[1]]);
    gDPSetEnvColor(POLY_OPA_DISP++, r, g, b, a);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[0]);

    /* Draw fire */
    if (shader->lists[1])
    {
        InitListPolyXlu(play->gs.gfx);
        shaderFlameEffect(play, shader->lists[1] - 1);
    }

    CLOSE_DISPS();
}

void Shader_CustomNut(GameState_Play* play, s16 shaderId)
{
    const Shader* shader;
    u8 r;
    u8 g;
    u8 b;
    u8 a;
    u32 fc;

    shader = &kShaders[shaderId];
    fc = play->gs.frameCount * 6;

    OPEN_DISPS(play->gs.gfx);
    InitListPolyOpa(play->gs.gfx);
    gSPSegment(POLY_OPA_DISP++, 0x09, GetSegment(play->gs.gfx, 0, fc, fc, 0x20, 0x20, 1, fc, fc, 0x20, 0x20));
    gSPMatrix(POLY_OPA_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    color4(&r, &g, &b, &a, kNutStickPrimColors[shader->lists[1]]);
    gDPSetPrimColor(POLY_OPA_DISP++, 0, 0, r, g, b, a);
    color4(&r, &g, &b, &a, kNutStickEnvColors[shader->lists[1]]);
    gDPSetEnvColor(POLY_OPA_DISP++, r, g, b, a);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[0]);

    /* Draw fire */
    if (shader->lists[1])
    {
        InitListPolyXlu(play->gs.gfx);
        shaderFlameEffect(play, shader->lists[1] - 1);
    }

    CLOSE_DISPS();
}

static void* pushMatrix(GfxContext* gfx, const float* mat)
{
    void* end = gfx->polyOpa.end;
    end = (char*)end - 0x40;
    gfx->polyOpa.end = end;

    ConvertMatrix(mat, end);

    return end;
}

static void* dummySegment(GfxContext* gfx)
{
    Gfx* end = gfx->polyOpa.end - 1;
    gfx->polyOpa.end = end;
    gSPEndDisplayList(end);
    return end;
}

void Shader_BossRemains(GameState_Play* play, s16 shaderId)
{
    static const float scale = 0.03f;
    static const float kMatrixScale[] = {
        scale, 0.f, 0.f, 0.f,
        0.f, scale, 0.f, 0.f,
        0.f, 0.f, scale, 0.f,
        0.f, 0.f, 0.f,   1.f,
    };
    const Shader* shader;

    shader = &kShaders[shaderId];
    OPEN_DISPS(play->gs.gfx);
    gSPMatrix(POLY_OPA_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    gSPMatrix(POLY_OPA_DISP++, pushMatrix(play->gs.gfx, kMatrixScale), G_MTX_NOPUSH | G_MTX_MUL | G_MTX_MODELVIEW);
    InitListPolyOpa(play->gs.gfx);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[0]);
    CLOSE_DISPS();
}

void Shader_SpiritualStones(GameState_Play* play, s16 shaderId)
{
    static const u32 kPrimColors[] = {
        0xffffa0ff,
        0xffaaffff,
        0x32ffffff,
    };

    static const u32 kEnvColors[] = {
        0x00ff00ff,
        0xff0064ff,
        0x320096ff,
    };

    static const float kMatrixRot[] = {
        1.f, 0.f, 0.f, 0.f,
        0.f, 0.f, 1.f, 0.f,
        0.f, -1.f, 0.f, 0.f,
        0.f, 0.f, 0.f, 1.f,
    };

    u8 r, g, b, a;
    const Shader* shader;
    int colorIndex;

    shader = &kShaders[shaderId];
    colorIndex = shader->lists[0];

    OPEN_DISPS(play->gs.gfx);

    /* Matrix setup */
    gSPMatrix(POLY_XLU_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    gSPMatrix(POLY_XLU_DISP++, pushMatrix(play->gs.gfx, kMatrixRot), G_MTX_NOPUSH | G_MTX_MUL | G_MTX_MODELVIEW);
    gSPMatrix(POLY_OPA_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    gSPMatrix(POLY_OPA_DISP++, pushMatrix(play->gs.gfx, kMatrixRot), G_MTX_NOPUSH | G_MTX_MUL | G_MTX_MODELVIEW);

    /* Segment setup */
    gSPSegment(POLY_XLU_DISP++, 9, dummySegment(play->gs.gfx));
    gSPSegment(POLY_OPA_DISP++, 8, dummySegment(play->gs.gfx));

    InitListPolyXlu(play->gs.gfx);
    color4(&r, &g, &b, &a, kPrimColors[colorIndex]);
    gDPSetPrimColor(POLY_XLU_DISP++, 0x00, 0x80, r, g, b, a);
    color4(&r, &g, &b, &a, kEnvColors[colorIndex]);
    gDPSetEnvColor(POLY_XLU_DISP++, r, g, b, a);
    gSPDisplayList(POLY_XLU_DISP++, shader->lists[1]);

    InitListPolyOpa(play->gs.gfx);
    gDPSetPrimColor(POLY_OPA_DISP++, 0x00, 0x80, 0xff, 0xff, 0xaa, 0xff);
    gDPSetEnvColor(POLY_OPA_DISP++, 0x96, 0x78, 0x00, 0xFF);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[2]);

    CLOSE_DISPS();
}

void Shader_MasterSword(GameState_Play* play, s16 shaderId)
{
    /* TODO: Pre-multiply the matrices */
    static const float scale = 0.07f;
    static const float kMatrixScale[] = {
        scale, 0.f, 0.f, 0.f,
        0.f, scale, 0.f, 0.f,
        0.f, 0.f, scale, 0.f,
        0.f, 0.f, 0.f,   1.f,
    };

    static const float kMatrixRot[] = {
        -M_SQRT1_2, -M_SQRT1_2, 0.f, 0.f,
        M_SQRT1_2, -M_SQRT1_2, 0.f, 0.f,
        0.f, 0.f, 1.f, 0.f,
        0.f, 0.f, 0.f, 1.f,
    };

    const Shader* shader;

    shader = &kShaders[shaderId];

    OPEN_DISPS(play->gs.gfx);
    gSPMatrix(POLY_OPA_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    gSPMatrix(POLY_OPA_DISP++, pushMatrix(play->gs.gfx, kMatrixRot), G_MTX_NOPUSH | G_MTX_MUL | G_MTX_MODELVIEW);
    gSPMatrix(POLY_OPA_DISP++, pushMatrix(play->gs.gfx, kMatrixScale), G_MTX_NOPUSH | G_MTX_MUL | G_MTX_MODELVIEW);
    gSPSegment(POLY_OPA_DISP++, 8, dummySegment(play->gs.gfx));
    InitListPolyOpa(play->gs.gfx);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[0]);
    CLOSE_DISPS();
}

void Shader_CustomSpin(GameState_Play* play, s16 shaderId)
{
    const Shader* shader;

    shader = &kShaders[shaderId];
    float rot;


    rot = (play->gs.frameCount * 0.01f);
    OPEN_DISPS(play->gs.gfx);
    ModelViewRotateX(rot * 3, MAT_MUL);
    ModelViewRotateY(rot * 5, MAT_MUL);
    ModelViewRotateZ(rot * 7, MAT_MUL);
    gSPMatrix(POLY_OPA_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    InitListPolyOpa(play->gs.gfx);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[0]);
    gSPDisplayList(POLY_OPA_DISP++, shader->lists[1]);

    InitListPolyXlu(play->gs.gfx);
    shaderFlameEffect(play, 2);
    CLOSE_DISPS();
}

typedef struct
{
    Vtx_t vertices[16];
    Gfx   dlist[48];
}
CustomStrayFairyObj;

#define qu016(x) ((x) * 65536)

CustomStrayFairyObj kStrayFairyObj =
{
    {
        /* Head */
        { { -20,  -2, 0 }, 0, { 0x000, 0x400 }, { 255, 255, 255, 255 } },
        { {  20,  -2, 0 }, 0, { 0x400, 0x400 }, { 255, 255, 255, 255 } },
        { {  20,  38, 0 }, 0, { 0x400, 0x000 }, { 255, 255, 255, 255 } },
        { { -20,  38, 0 }, 0, { 0x000, 0x000 }, { 255, 255, 255, 255 } },

        /* Body */
        { {  -6, -19, 0 }, 0, { 0x000, 0x400 }, { 255, 255, 255, 255 } },
        { {   6, -19, 0 }, 0, { 0x200, 0x400 }, { 255, 255, 255, 255 } },
        { {   6,   1, 0 }, 0, { 0x200, 0x000 }, { 255, 255, 255, 255 } },
        { {  -6,   1, 0 }, 0, { 0x000, 0x000 }, { 255, 255, 255, 255 } },

        /* Limbs */
        { { -10,  23, 0 }, 0, { 0x000, 0x200 }, { 255, 255, 255, 255 } },
        { {   5,  48, 0 }, 0, { 0x200, 0x200 }, { 255, 255, 255, 255 } },
        { {  30,  63, 0 }, 0, { 0x200, 0x000 }, { 255, 255, 255, 255 } },
        { {  15,  38, 0 }, 0, { 0x000, 0x000 }, { 255, 255, 255, 255 } },
        { {  10,  23, 0 }, 0, { 0x000, 0x200 }, { 255, 255, 255, 255 } },
        { {  -5,  48, 0 }, 0, { 0x200, 0x200 }, { 255, 255, 255, 255 } },
        { { -30,  63, 0 }, 0, { 0x200, 0x000 }, { 255, 255, 255, 255 } },
        { { -15,  38, 0 }, 0, { 0x000, 0x000 }, { 255, 255, 255, 255 } },
    },
    {
        gsDPPipeSync(),
        gsDPSetCombineLERP(TEXEL1, PRIMITIVE, PRIM_LOD_FRAC, TEXEL0, TEXEL1, 1, PRIM_LOD_FRAC, TEXEL0, PRIMITIVE, ENVIRONMENT, COMBINED, ENVIRONMENT, COMBINED, 0, PRIMITIVE, 0),
        gsDPSetRenderMode(G_RM_PASS, G_RM_ZB_CLD_SURF2),
        gsSPClearGeometryMode(G_CULL_BACK | G_LIGHTING | G_TEXTURE_GEN | G_TEXTURE_GEN_LINEAR),
        gsDPSetTextureLUT(G_TT_NONE),
        gsSPTexture(0xffff, 0xffff, 0, G_TX_RENDERTILE, G_ON),
        gsSPVertex(offsetof(CustomStrayFairyObj, vertices) | 0x06000000, 16, 0),
        gsDPLoadTextureBlock(
            0x0402c030,
            G_IM_FMT_IA, G_IM_SIZ_8b,
            16, 32,
            0,
            G_TX_MIRROR | G_TX_CLAMP,
            G_TX_MIRROR | G_TX_CLAMP,
            G_TX_NOMASK, G_TX_NOMASK,
            G_TX_NOLOD, G_TX_NOLOD
        ),
        gsSP2Triangles(4, 5, 6, 0, 4, 6, 7, 0),
        gsDPLoadTextureBlock(
            0x0402c630,
            G_IM_FMT_IA, G_IM_SIZ_8b,
            16, 16,
            0,
            G_TX_MIRROR | G_TX_CLAMP,
            G_TX_MIRROR | G_TX_CLAMP,
            G_TX_NOMASK, G_TX_NOMASK,
            G_TX_NOLOD, G_TX_NOLOD
        ),
        gsSP2Triangles(8, 9, 10, 0, 8, 10, 11, 0),
        gsSP2Triangles(12, 13, 14, 0, 12, 14, 15, 0),
        gsDPLoadTextureBlock(
            0x0402bc30,
            G_IM_FMT_IA, G_IM_SIZ_8b,
            32, 32,
            0,
            G_TX_MIRROR | G_TX_CLAMP,
            G_TX_MIRROR | G_TX_CLAMP,
            G_TX_NOMASK, G_TX_NOMASK,
            G_TX_NOLOD, G_TX_NOLOD
        ),
        gsSP2Triangles(0, 1, 2, 0, 0, 2, 3, 0),
        gsSPEndDisplayList(),
    }
};

static void Shader_CustomStrayFairy(GameState_Play* play, s16 shaderId)
{
    static u32 kEnvColors[] = {
        0xba5084ff,
        0x45852bff,
        0x7f65ccff,
        0xc2c164ff,
    };

    static u32 kPrimColors[] = {
        0xd2b8c8ff,
        0xf0f6c2ff,
        0xe1ebfdff,
        0xfefee7ff,
    };

    int index;
    u8 r;
    u8 g;
    u8 b;
    u8 a;

#if defined(GAME_MM)
    index = gSaveContext.dungeonId;
#else
    index = 0;
#endif
    comboSetObjectSegment(play->gs.gfx, &kStrayFairyObj);
    ModelViewUnkTransform((float*)((char*)play + kMatTransformOffset));
    OPEN_DISPS(play->gs.gfx);
    gSPMatrix(POLY_XLU_DISP++, GetMatrixMV(play->gs.gfx), G_MTX_PUSH | G_MTX_LOAD | G_MTX_MODELVIEW);
    InitListPolyXlu(play->gs.gfx);
    color4(&r, &g, &b, &a, kEnvColors[index]);
    gDPSetEnvColor(POLY_XLU_DISP++, r, g, b, a);
    color4(&r, &g, &b, &a, kPrimColors[index]);
    gDPSetPrimColor(POLY_XLU_DISP++, 0, 0, r, g, b, a);
    gSPDisplayList(POLY_XLU_DISP++, offsetof(CustomStrayFairyObj, dlist) | 0x06000000);
    CLOSE_DISPS();
}

const Shader kShaders[] = {
#include "data/shaders.inc"
};
