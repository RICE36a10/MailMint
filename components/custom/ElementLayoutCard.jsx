import React from 'react'

export function ElementLayoutCard({layout}) {
    return (
        <div className={'flex items-center justify-center flex-col border border-dashed rounded-xl p-3 group hover:shadow-md hover:border-primary cursor-pointer'}>
            {<layout.icon className={'group-hover:bg-purple-100 p-1 h-9 w-9 p-2 rounded-md '}/>}
            <h2 className={'text-sm'}>{layout.label}</h2>
        </div>
    )
}
