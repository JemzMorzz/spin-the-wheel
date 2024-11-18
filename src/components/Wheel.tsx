'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, RotateCw, ArrowBigDown, ArrowDown } from 'lucide-react'

interface WheelItem {
    id: number
    text: string
    color: string
}

const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA',
    '#F0B67F', '#FE4A49', '#A3CEF1', '#7E6B8F', '#96C0B7'
]

export default function SpinWheel() {
    const [items, setItems] = useState<WheelItem[]>([
        { id: 1, text: 'Item 1', color: COLORS[0] },
        { id: 2, text: 'Item 2', color: COLORS[1] },
        { id: 3, text: 'Item 3', color: COLORS[2] },
    ])
    const [newItem, setNewItem] = useState('')
    const [spinning, setSpinning] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [rotation, setRotation] = useState(0)

    const addItem = (e: React.FormEvent) => {
        e.preventDefault()
        if (newItem.trim() !== '') {
            setItems([
                ...items,
                {
                    id: Date.now(),
                    text: newItem.trim(),
                    color: COLORS[items.length % COLORS.length],
                },
            ])
            setNewItem('')
        }
    }

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    const spinWheel = () => {
        if (items.length < 2 || spinning) return;
        setSpinning(true);
        setResult(null);
        const newRotation = rotation + 1440 + Math.floor(Math.random() * 360);
        setRotation(newRotation);

        setTimeout(() => {
            setSpinning(false);            const stopAngle = newRotation % 360;
            const adjustedAngle = (360 - stopAngle - 90 + 360) % 360;
            const winningIndex = Math.floor(adjustedAngle / (360 / items.length)) % items.length;

            setResult(items[winningIndex]?.text || 'Error: Item not found');
        }, 5000);
    };



    const renderWheel = () => {
        const totalItems = items.length
        const wheelRadius = 150
        const centerX = 200
        const centerY = 200

        return (
            <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full h-auto">
                <motion.g
                    animate={{ rotate: rotation }}
                    transition={{ duration: 5, ease: "easeOut" }}
                    style={{ originX: "50%", originY: "50%" }}
                >
                    {items.map((item, index) => {
                        const angle = (index / totalItems) * 360
                        const startAngle = angle * (Math.PI / 180)
                        const endAngle = ((index + 1) / totalItems) * 360 * (Math.PI / 180)
                        const x1 = centerX + wheelRadius * Math.cos(startAngle)
                        const y1 = centerY + wheelRadius * Math.sin(startAngle)
                        const x2 = centerX + wheelRadius * Math.cos(endAngle)
                        const y2 = centerY + wheelRadius * Math.sin(endAngle)

                        const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"

                        const pathData = [
                            `M ${centerX} ${centerY}`,
                            `L ${x1} ${y1}`,
                            `A ${wheelRadius} ${wheelRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            "Z"
                        ].join(" ")

                        return (
                            <g key={item.id}>
                                <path d={pathData} fill={item.color} />
                                <text
                                    x={centerX + (wheelRadius * 0.7 * Math.cos((startAngle + endAngle) / 2))}
                                    y={centerY + (wheelRadius * 0.7 * Math.sin((startAngle + endAngle) / 2))}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="white"
                                    fontSize="12"
                                    fontWeight="bold"
                                    transform={`rotate(${(angle + 180 / totalItems)} ${centerX + (wheelRadius * 0.7 * Math.cos((startAngle + endAngle) / 2))} ${centerY + (wheelRadius * 0.7 * Math.sin((startAngle + endAngle) / 2))})`}
                                >
                                    {item.text}
                                </text>
                            </g>
                        )
                    })}
                </motion.g>
                <circle cx={centerX} cy={centerY} r="5" fill="white" stroke="black" strokeWidth="2" />
            </svg>
        )
    }

    return (
        <div className="min-h-screen text-black bg-gray-100 w-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Spin the Wheel</h1>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex flex-col items-center justify-center mb-8 relative">
                            <ArrowDown className='text-black' />
                            {renderWheel()}

                        </div>
                        <div className="flex justify-center mb-4">
                            <button
                                onClick={spinWheel}
                                disabled={spinning || items.length < 2}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                aria-label={spinning ? "Wheel is spinning" : "Spin the wheel"}
                            >
                                <RotateCw className="mr-2" aria-hidden="true" />
                                {spinning ? 'Spinning...' : 'Spin the Wheel'}
                            </button>
                        </div>

                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="text-center text-xl font-bold text-green-600 mb-4"
                                    aria-live="polite"
                                >
                                    Result: {result}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={addItem} className="flex mb-4">
                            <label htmlFor="new-item" className="sr-only">Enter new item</label>
                            <input
                                id="new-item"
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder="Enter new item"
                                className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r-md flex items-center"
                                aria-label="Add new item"
                            >
                                <Plus className="mr-2" aria-hidden="true" />
                                Add Item
                            </button>
                        </form>

                        <ul className="divide-y divide-gray-200" aria-label="Wheel items">
                            {items.map((item) => (
                                <li key={item.id} className="py-3 flex justify-between items-center">
                                    <span className="text-gray-800">{item.text}</span>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-600"
                                        aria-label={`Remove ${item.text}`}
                                    >
                                        <Trash2 aria-hidden="true" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
