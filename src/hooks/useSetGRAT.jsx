import React, { useEffect, useState } from 'react'

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateGRAT } from '../state/app/actions'

/**
 * Hook to use desktop state and action
 * @returns Desktop's state and dispatch function
 */
export const useSetGRAT = () => {
  const dispatch = useDispatch();

  const GRAT = useSelector((state) => state.app.GRAT)

  const setGRAT = useCallback(
    (GRAT) => {
      dispatch(updateGRAT({ GRAT }))
    },
    [dispatch],
  )

  return [GRAT, setGRAT]
}

export default useSetGRAT;