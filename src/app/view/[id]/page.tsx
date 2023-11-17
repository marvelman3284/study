"use client"
import React, { useState } from "react";

export default function App( { params }: { params: {id:string}}) {
  return (
    <div>
      <p>{params.id}</p>
    </div>
  )
}
