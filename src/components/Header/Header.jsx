import { logout } from '@/features/authSlice';
import { Button } from '../ui/button';
import { LogOut, Users } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <>
            <div className="fixed top-0 w-full py-1 md:py-2 px-1 md:px-4 lg:px-8 z-40 flex justify-between items-center bg-[#0e3150] bg-opacity-10 backdrop-blur-2xl">
                <Button
                    className="flex gap-2 px-2"
                    onClick={() => navigate('/')}
                >
                    <div className='font-bold text-2xl tracking-wider text-blue-600 dark:text-blue-400'>EmployWise</div>
                </Button>

                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/')}
                    >
                        <Users
                            style={{ height: '24px', width: '24px' }}
                            className='text-blue-600 dark:text-blue-400 mr-1'
                        />
                        <span className='sr-only'>Open Sidebar</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            dispatch(logout())
                            navigate('/auth/login')
                        }}
                    >
                        <LogOut
                            style={{ height: '24px', width: '24px' }}
                            className='text-blue-600 dark:text-blue-400 mr-1'
                        />
                        <span className='sr-only'>Open Sidebar</span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Header;
