import { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext'; // jahan se token milta ho
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const appointmentId = searchParams.get('appointmentId');
    const navigate = useNavigate();
    const { uToken } = useContext(AppContext);  // token context se le lo

    useEffect(() => {
        const markPaid = async () => {
            try {
                await axios.patch(
                    `${ import.meta.env.VITE_API_URL } /api/user/mark-paid/${appointmentId}`,
                  {}, // empty body
                  {
                    headers: {
                      Authorization: `Bearer ${uToken}`,
                    },
                  }
                );
                Swal.fire({
                       title: 'Payment Successfully',
                       text: "Your payment has been processed successfully.",
                       icon: 'success',
                       confirmButtonText: 'Close'
                     })
                navigate('/my-appointments');
            } catch (err) {
                console.error('Payment update error:', err.response || err.message);
                alert('Payment succeeded but update failed');
            }
        };

        if (appointmentId) markPaid();
    }, [appointmentId, navigate, uToken]);

    return <h2 className="text-center mt-20 text-green-600 text-xl">Processing Payment...</h2>;
};

export default PaymentSuccess;
