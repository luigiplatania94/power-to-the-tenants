import React from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

interface TraitsSelectProps {
    selectedTraits: string[];
    allTraits: string[];
    handleChange: (selectedTraits: string[]) => void; // Update this line
    isSmallScreen?: boolean;
}

const SelectTraits: React.FC<TraitsSelectProps> = ({ selectedTraits, allTraits, handleChange, isSmallScreen }) => {
    return (
        <FormControl margin="normal" variant="outlined" size={isSmallScreen ? 'small' : 'medium'}>
            <InputLabel id="traits-label">Traits</InputLabel>
            <Select
                value={selectedTraits}
                labelId="traits-label"
                id="traits-select"
                multiple
                onChange={(event) => handleChange(event.target.value as string[])}
                input={<OutlinedInput label="Traits" />}
                renderValue={(selected) => (
                    <Box sx={{  display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {allTraits.map((trait) => (
                    <MenuItem key={trait} value={trait}>
                        {trait}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectTraits;
