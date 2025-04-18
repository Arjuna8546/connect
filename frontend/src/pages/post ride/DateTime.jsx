"use client";
import React, { useState } from "react";
import { Navigation } from "../../components/user/othercomponent/Navigation";
import dayjs from "dayjs";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Paper, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { useLocation, useNavigate } from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const DateTime = () => {

    const location = useLocation()
    const states = location?.state
    const nav = useNavigate()

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(dayjs());
    const [combinedOutput, setCombinedOutput] = useState("");

    const handleSubmit = () => {
        const date = selectedDate?.format("YYYY-MM-DD");
        const time = selectedTime?.format("HH:mm");
        const combined = `${date} ${time}`;
        setCombinedOutput(combined);
        nav('/count',{state:{...states,date_time:{date:date,time:time}}})
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main className="flex flex-col min-h-screen bg-black">
                <Navigation />

                <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch mt-6 w-full max-w-[1440px] px-4 md:px-6 lg:px-8 pb-10">

                    <div className="w-full max-w-sm bg-[#121212] p-4 rounded-2xl shadow-lg border  flex flex-col justify-between min-h-[520px]">
                        <h2 className="text-lg font-bold mb-4 text-white text-center">Select Date</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                sx={{ maxWidth: "100%" }}
                                slots={{ actionBar: () => null }}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="w-full max-w-sm bg-[#121212] p-4 rounded-2xl shadow-lg border min-h-[520px] flex flex-col">
                        <h2 className="text-lg font-bold mb-4 text-white text-center">Select Time</h2>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Paper>
                                <StaticTimePicker
                                    value={selectedTime}
                                    onChange={(newValue) => setSelectedTime(newValue)}
                                    sx={{ maxWidth: "100%" }}
                                    slots={{ actionBar: () => null }}
                                />
                            </Paper>
                        </LocalizationProvider>
                    </div>

                </div>

                <div className="flex justify-center items-center pb-8">
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            mt: 2,
                            fontSize: "1rem",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            backgroundColor: "#fff",
                            color: "#000",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            height: "62px",
                            borderRadius: "30px",
                            letterSpacing: "3.15px",
                            width: "100%",
                            maxWidth: "436px",
                            "&:hover": {
                                backgroundColor: "#e5e5e5",
                            },
                        }}
                    >
                        CONTINUE
                    </Button>

                </div>
            </main>
        </ThemeProvider>
    );
};

export default DateTime;
