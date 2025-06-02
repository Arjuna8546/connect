import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import {
    LogIn,
    Car,
    MapPin,
    CreditCard,
    Mail,
    Upload,
    Clock,
    Play,
    Navigation,
    ShieldCheck,
} from 'lucide-react';

const nodeStyle = {
    background: '#1e1e1e',
    color: 'white',
    border: '2px solid #9b87f5',
    padding: 10,
    borderRadius: 10,
    fontSize: 12,
    width: 220,
    textAlign: 'center',
};

const getNodeLabel = (IconComponent, text) => (
    <div className="flex flex-col items-center">
        <IconComponent className={`w-6 h-6 text-[#9b87f5]`} />
        <span className="mt-2">{text}</span>
    </div>
);

const nodes = [
    {
        id: '1',
        type: 'input',
        data: { label: getNodeLabel(LogIn, 'Login (Email / Google)', 'animate-bounce') },
        position: { x: 250, y: 0 },
        style: nodeStyle,
    },
    {
        id: '2',
        data: { label: getNodeLabel(Car, 'Book Ride', 'animate-pulse') },
        position: { x: 100, y: 100 },
        style: nodeStyle,
    },
    {
        id: '3',
        data: { label: getNodeLabel(Upload, 'Post Ride', 'animate-pulse') },
        position: { x: 400, y: 100 },
        style: nodeStyle,
    },
    {
        id: '4',
        data: { label: getNodeLabel(MapPin, 'View Available Rides (5km Radius)', 'animate-bounce') },
        position: { x: 50, y: 200 },
        style: nodeStyle,
    },
    {
        id: '5',
        data: { label: getNodeLabel(Car, 'Book / Request Ride', 'animate-pulse') },
        position: { x: 80, y: 300 },
        style: nodeStyle,
    },
    {
        id: '6',
        data: { label: getNodeLabel(CreditCard, 'Pay for Booking', 'animate-pulse') },
        position: { x: 60, y: 400 },
        style: nodeStyle,
    },
    {
        id: '7',
        data: { label: getNodeLabel(Mail, 'Receive OTP via Mail', 'animate-bounce') },
        position: { x: 60, y: 500 },
        style: nodeStyle,
    },
    {
        id: '8',
        data: { label: getNodeLabel(Upload, 'Provide Ride Details', 'animate-pulse') },
        position: { x: 380, y: 200 },
        style: nodeStyle,
    },
    {
        id: '9',
        data: { label: getNodeLabel(Clock, 'Ride Type: Instant or Request-Based', 'animate-bounce') },
        position: { x: 380, y: 300 },
        style: nodeStyle,
    },
    {
        id: '10',
        data: { label: getNodeLabel(Upload, 'Ride Posted', 'animate-pulse') },
        position: { x: 380, y: 400 },
        style: nodeStyle,
    },
    {
        id: '11',
        data: { label: getNodeLabel(Play, 'Start Ride (Mobile App)', 'animate-bounce') },
        position: { x: 250, y: 600 },
        style: nodeStyle,
    },
    {
        id: '12',
        data: { label: getNodeLabel(Navigation, 'Live Tracking Enabled', 'animate-pulse') },
        position: { x: 250, y: 700 },
        style: nodeStyle,
    },
    {
        id: '13',
        data: { label: getNodeLabel(ShieldCheck, 'Verify Riders via OTP', 'animate-bounce') },
        position: { x: 250, y: 800 },
        style: nodeStyle,
    },
];

const edges = [
    { id: 'e1-2', source: '1', target: '2', style: { stroke: '#9b87f5' } },
    { id: 'e1-3', source: '1', target: '3', style: { stroke: '#9b87f5' } },
    { id: 'e2-4', source: '2', target: '4', style: { stroke: '#9b87f5' } },
    { id: 'e4-5', source: '4', target: '5', style: { stroke: '#9b87f5' } },
    { id: 'e5-6', source: '5', target: '6', style: { stroke: '#9b87f5' } },
    { id: 'e6-7', source: '6', target: '7', style: { stroke: '#9b87f5' } },
    { id: 'e7-11', source: '7', target: '11', style: { stroke: '#9b87f5' } },
    { id: 'e3-8', source: '3', target: '8', style: { stroke: '#9b87f5' } },
    { id: 'e8-9', source: '8', target: '9', style: { stroke: '#9b87f5' } },
    { id: 'e9-10', source: '9', target: '10', style: { stroke: '#9b87f5' } },
    { id: 'e10-11', source: '10', target: '11', style: { stroke: '#9b87f5' } },
    { id: 'e11-12', source: '11', target: '12', style: { stroke: '#9b87f5' } },
    { id: 'e12-13', source: '12', target: '13', style: { stroke: '#9b87f5' } },
];

export default function RideFlowChart() {
    return (
        <div className="w-full bg-black" style={{ height: '80vh' }}>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <Background color="#c4b5fd" gap={20} />
                <Controls style={{ backgroundColor: '#1e1e1e', borderColor: '#9b87f5' }} />
            </ReactFlow>
        </div>
    );
}

