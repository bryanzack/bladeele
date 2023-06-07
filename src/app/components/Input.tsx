'use client';
import {Autocomplete, makeStyles, TextField} from "@mui/material";
import {ChangeEvent, SyntheticEvent, useState} from "react";
import {ListInfo, TList} from "@/utils/types";




export default function Input({list_info}: {list_info: ListInfo}) {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'right'|'wrong'|null>(null);
    const [guess_count, setGuessCount] = useState(0);
    const track_array = list_info.exhaustive_tracklist;
    const handleChange = (event:  SyntheticEvent<Element, Event>, value: string|null) => {
        if (value !== null) {
            console.log(value);
            setInput(value);
        } else {
            console.log('Error: tried changing to null value');
        }
    }

    const handleClick = async () => {
        const res = await fetch('/api/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Guess': input,
            }
        }).then(r => r.json())
            .catch(e => {
                console.log(`e: ${e}`)
            });
        setGuessCount(guess_count+1)
        setStatus(res.status);
    }
    //TODO: trigger end of game when status is 'right'

    return (
        <div className={' flex flex-col items-center justify-center absolute z-50 bg-white bottom-0 left-0'}>
            {/*
            <span>{status}</span>
            <span>guesses: {guess_count}</span>
            */}
            <div className={'w-[400px] flex flex-row items-center justify-center h-fit rounded-md'}>
                {/* TODO: group tracks by album */}
                <Autocomplete
                    className={'flex bg-black text-white '}
                    disabled={status === 'right'}
                    disablePortal
                    id="combo-box-demo"
                    onChange={(e, value) => handleChange(e, value)}
                    options={track_array}
                    sx={{ width: '100%', color: 'black' }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tracks"
                            variant={'filled'}
                        />
                    )}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option}>
                                {option}
                            </li>
                        )
                    }}
                />
                <button
                    disabled={status === 'right'}
                    onClick={handleClick}
                    className={'flex w-[50px] h-full'}>Test</button>
            </div>
        </div>
    )
}

/*

                <TextField
                    disabled={status === 'right'}
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
                    sx={{width: '100%', height: '100%'}} id="filled-basic" label="Filled" variant="filled" />
 */