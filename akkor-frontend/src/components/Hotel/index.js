import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { CardContent, CardHeader, Grid, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';


function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [hotelEdited, setHotelEdited] = useState(null);

    const fetchHotels = async () => {
        await fetch("http://localhost:8000/hotels/").then(async response => {
            if (response.status === 200) {
                const data = await response.json();
                setHotels(data)
            }
            else {

            } 
        })
        console.log(hotels)
    }

    const deleteItem = async (id) => {
        const newList = hotels.filter(item => item._id !== id);
        setHotels(newList);
    }

    const addItem = async () => {
        const newItem = {
            _id: "1",
            name: "hotel",
            location: "Paris",
            description: "Just a hotel",
            pictureList: ["1", "2"]
        }
        setHotels([...hotels, newItem])
    }

    useEffect(() => {
        fetchHotels();
        // eslint-disable-next-line
    }, []);

    return(
        <section>
            <div>
                <h1>Hotel</h1>
                <Grid container spacing={2}>
                {hotels.length > 0 && hotels.map(item =>
                    <Grid item xs={4}>
                        {hotelEdited?._id !== item._id ?
                            <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    title={item.name}
                                    subheader={item.location}
                                    action={
                                        <IconButton aria-label="settings">
                                            <DeleteIcon onClick={() => deleteItem(item._id)}/>
                                        </IconButton>
                                    }
                                />
                                <CardContent>
                                    <Typography paragraph>{item.description}</Typography>
                                    <IconButton aria-label="settings">
                                        <EditIcon onClick={() => setHotelEdited(Object.assign({}, item))}/>
                                    </IconButton>
                                </CardContent>
                            </Card> :
                        
                            <Card variant="outlined" sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    title={<TextField value={hotelEdited.name} onChange={e => hotelEdited.name = e.target.value}/>}
                                    subheader={<TextField value={hotelEdited.location}/>}
                                />
                                <CardContent>
                                <TextField value={hotelEdited.description}/>
                                    <IconButton aria-label="settings">
                                        <ClearIcon onClick={() => setHotelEdited(null)}/>
                                    </IconButton>
                                    <IconButton aria-label="settings">
                                        <DoneIcon onClick={() => setHotelEdited(null)}/>
                                    </IconButton>
                                </CardContent>
                            </Card>}
                    </Grid> 
                )}
                { hotelEdited === null && <Grid item xs={4}>
                    <Card variant="outlined" sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography>Add hotel</Typography>
                            <IconButton aria-label="settings">
                                <AddIcon onClick={addItem}/>
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>}
                </Grid>
            </div>
        </section>
    );

}

export default Hotel