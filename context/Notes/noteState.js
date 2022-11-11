import react from 'react'

import NoteContext from './noteContext' ;

const noteState = () => {

    const state = {}

    return (
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default noteState ;