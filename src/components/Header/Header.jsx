import { logout } from '@/features/authSlice';
import { Button } from '../ui/button';
import { LogOut, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token);

    return (
        <>
            <div className="fixed top-0 w-full py-1 md:py-2 px-1 md:px-4 lg:px-8 z-40 flex justify-between items-center bg-[#0e3150] bg-opacity-10 backdrop-blur-2xl">
                <Button
                    className="flex gap-2 px-2 bg-transparent hover:bg-transparent shadow-transparent"
                    onClick={() => navigate('/')}
                >
                    <div className='font-bold text-2xl tracking-wider text-blue-300 bg-transparent'>
                        EmployWise
                    </div>
                </Button>

                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/')}
                        className="hover:bg-[#335470a7]"
                    >
                        <Users
                            style={{ height: '24px', width: '24px' }}
                            className='text-blue-300 dark:text-blue-300 mr-1'
                        />
                        <span className='sr-only'>Open Sidebar</span>
                    </Button>

                    {token &&
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                dispatch(logout())
                                navigate('/auth/login')
                            }}
                            className="hover:bg-[#335470a7]"
                        >
                            <LogOut
                                style={{ height: '24px', width: '24px' }}
                                className='text-blue-300 dark:text-blue-300 mr-1'
                            />
                            <span className='sr-only'>Open Sidebar</span>
                        </Button>
                    }
                </div>
            </div>
        </>
    )
}

export default Header;
