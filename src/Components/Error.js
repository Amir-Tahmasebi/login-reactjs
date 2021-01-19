import React from 'react'
import { useAuthState } from '../Context/auth-context'

export default function Error() {
    const {error} = useAuthState()
    return (
        <h2>
            { error }
        </h2>
    )
}
