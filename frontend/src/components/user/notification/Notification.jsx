import React, { useEffect, useRef } from 'react';
import { getSocket } from '../../../service/webSocket';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { MessageSquareText } from 'lucide-react';

function Notification() {
  const userId = useSelector(state => state?.user?.user?.id);
  const socketRef = useRef(null);

  useEffect(() => {
    if (userId && !socketRef.current) {
      const socket = getSocket(userId);
      socketRef.current = socket;

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        toast.custom((t) => (
          <div
            className={`max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
              t.visible ? 'animate-enter' : 'animate-leave'
            }`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <MessageSquareText className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {data?.message?.sender} sent a message
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {data?.message?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ));
      };
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [userId]);

  return <Toaster position="top-right" reverseOrder={false} />;
}

export default Notification;

