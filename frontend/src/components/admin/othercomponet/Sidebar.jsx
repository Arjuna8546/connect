import { useNavigate } from "react-router-dom";
import { logout } from "../../../Endpoints/APIs";
import {
    UserFriendsIcon,
    DiscourseIcon,
    UserIcon,
    PayPalIcon,
    TimesCircleIcon,
  } from "../dashboardpage/Icon";
import toast from "react-hot-toast";
  
  const NavItem = ({ icon: Icon, label, onClick }) => (
    <div className="flex gap-5 items-center p-5 border-b border-solid border-b-neutral-800"
    onClick={onClick}>
      <div>
        <Icon />
      </div>
      <div className="text-sm font-bold uppercase tracking-[2.73px]">{label}</div>
    </div>
  );
  
  const Sidebar = () => {
    const nav = useNavigate()
    const onLogout = async () => {
      try {
        const response = await logout();
        if (response?.data?.success === true) {
          toast.success("Logged out successfully");
          localStorage.removeItem("admin_id")
          nav("/admin/login"); 
        } else {
          toast.error("Logout failed. Try again.");
        }
      } catch (error) {
        toast.error("Something went wrong during logout.");
        console.error("Logout error:", error);
      }
    };

    const onUserManagement = ()=>{
      nav('/admin/dashboard')
    }
    const onRidesManagement = ()=>{
      nav('/admin/rides')
    }
    const onBookManagement = ()=>{
      nav('/admin/bookings')
    }
        const onPaymentManagement = ()=>{
      nav('/admin/payments')
    }
    return (
      <nav className="fixed border-r border-solid bg-stone-950 border-r-neutral-800 w-[258px] h-[calc(100vh-104px)] max-md:hidden">
        <NavItem icon={UserFriendsIcon} label="user management" onClick={onUserManagement} />
        <NavItem icon={DiscourseIcon} label="ALL rides" onClick={onRidesManagement} />
        <NavItem icon={UserIcon} label="BOOKINGS" onClick={onBookManagement} />
        <NavItem icon={PayPalIcon} label="reports"  />
        <NavItem icon={TimesCircleIcon} label="Payments & REFUND"onClick={onPaymentManagement} />
        <NavItem icon={TimesCircleIcon} label="log out" onClick={onLogout} />
      </nav>
    );
  };
  
  export default Sidebar;
  