import React from 'react';
import {Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select} from '@mui/material';

interface TraitsSelectProps {
    defaultTraits?: string[];
    allTraits: string[];
    onChange: (selectedTraits: string[]) => void; // Update this line
    isSmallScreen?: boolean;
    error?:boolean;
    helperText?:React.ReactNode;
}

const SelectTraits: React.FC<TraitsSelectProps> = ({ 
       defaultTraits, 
       allTraits,
       onChange, 
       isSmallScreen, 
       error,
       helperText,
}) => {
    return (
        <FormControl margin="normal" variant="outlined" size={isSmallScreen ? 'small' : 'medium'} error={error} className={"bounceFromRight"}>
            <InputLabel  id="traits-label">Traits</InputLabel>
            <Select
                defaultValue={defaultTraits || allTraits.slice(0, 2)}
                labelId="traits-label"
                id="traits-select"
                multiple
                onChange={(event) => onChange(event.target.value as string[])}
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
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default SelectTraits;
