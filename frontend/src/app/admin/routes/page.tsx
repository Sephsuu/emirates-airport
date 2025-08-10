"use client"

import { useState } from "react";

export default function RoutesTable() {
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [search, setSearch] = useState("");
    const [toUpdate, setUpdate] = useState<Country>();
    const [toDelete, setDelete] = useState<Country>();
    return();
}