import React, {useState} from "react";
import {Box, IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

 const InputLine = (props: { onChange: (identifier: string) => void }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = () => {
        props.onChange(inputValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <Box mb={2} mt={2}>
            <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
                onSubmit={handleSubmit}
            >
                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>

                <InputBase
                    onChange={(e) => setInputValue(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="nickname, steamID64, battleyeID"
                />
            </Paper>
        </Box>
    );
};
export default InputLine