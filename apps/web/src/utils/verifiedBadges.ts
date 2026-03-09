/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type Room } from "matrix-js-sdk/src/matrix";

import { MatrixClientPeg } from "../MatrixClientPeg";
import {
    ADMIN_VERIFIED_POWER_LEVEL,
    ENABLE_ADMIN_VERIFIED_BADGE,
    VERIFIED_USERS,
} from "../config/verified-users";

const VERIFIED_USER_SET = new Set(VERIFIED_USERS.map((userId) => userId.toLowerCase()));

export interface VerifiedBadgeContext {
    userId?: string | null;
    room?: Room | null;
    roomId?: string | null;
    powerLevel?: number | null;
}

export function isVerifiedUserId(userId?: string | null): boolean {
    return !!userId && VERIFIED_USER_SET.has(userId.toLowerCase());
}

function isAdminPowerLevel(powerLevel?: number | null): boolean {
    return typeof powerLevel === "number" && powerLevel >= ADMIN_VERIFIED_POWER_LEVEL;
}

function getRoomFromRoomId(roomId?: string | null): Room | null {
    if (!roomId) return null;
    return MatrixClientPeg.get()?.getRoom(roomId) ?? null;
}

function getPowerLevelFromRoom(userId: string, room?: Room | null): number | undefined {
    return room?.getMember(userId)?.powerLevel;
}

export function shouldShowVerifiedBadge(context: VerifiedBadgeContext): boolean {
    const { userId } = context;
    if (!userId) return false;
    if (isVerifiedUserId(userId)) return true;
    if (!ENABLE_ADMIN_VERIFIED_BADGE) return false;
    if (isAdminPowerLevel(context.powerLevel)) return true;

    const room = context.room ?? getRoomFromRoomId(context.roomId);
    return isAdminPowerLevel(getPowerLevelFromRoom(userId, room));
}
