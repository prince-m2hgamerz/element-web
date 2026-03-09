/*
Copyright 2026 Element Creations Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import React, { type JSX } from "react";
import classNames from "classnames";

interface VerifiedBadgeProps {
    className?: string;
    title?: string;
}

export default function VerifiedBadge({
    className,
    title = "Verified account",
}: Readonly<VerifiedBadgeProps>): JSX.Element {
    return (
        <span className={classNames("mx_VerifiedBadge", className)} title={title} aria-label={title} role="img">
            {"\u2713"}
        </span>
    );
}
