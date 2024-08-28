"use client"
import { AppDispatch, RootState } from '@/redux/store/store'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, User } from '../../../redux/slice/userSlice'
import Navbar from '@/components/navbar/Navbar'
import HeroSec from '@/components/sections/homesec/herosec/HeroSec'
import GoalSec from '@/components/sections/homesec/goalsec/GoalSec'
type Props = {}

const Dashboard = (props: Props) => {
    const users = useSelector((state: RootState) => state.users.users)
    const dispatch = useDispatch<AppDispatch>()

    const [allUsers, setAllUsers] = useState<User[]>({
        ...users
    })

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    
  return (
    <div className='dashboard'>
            <div className="home_page">
                <Navbar/>
                <HeroSec/>
                <GoalSec/>
        </div>
    </div>
  )
}

export default Dashboard