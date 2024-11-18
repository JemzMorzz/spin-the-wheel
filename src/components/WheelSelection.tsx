'use client'

import React, { useEffect, useState } from 'react'
import { getWheel } from '@/api/wheelApi'
import { useRouter } from 'next/navigation'
interface Wheel {
    _id: string,
    name: string
}


export default function WheelSelection() {
    const router = useRouter()
    const [wheels, setWheels] = useState<Wheel[]>([])
    useEffect(() => {
        getWheel().then(setWheels).catch(console.error);
    }, [])

    const handleWheelClick = (id: string) => {
        router.push(`/wheel/${id}`)
    }

    return (
        <div className='flex flex-col p-5'>
            <h1 className='font-bold text-green-800 text-xl py-2'>Wheel Selection</h1>
                {wheels.map(wheel => (
                    <div key={wheel._id} onClick={() => handleWheelClick(wheel._id)} className='p-2 bg-green-300 hover:bg-green-500 cursor-pointer rounded-md w-[250px]'>
                        <label className='text-green-800 font-bold'>{wheel.name}</label>

                    </div>
                ))}
        </div>
    )
}