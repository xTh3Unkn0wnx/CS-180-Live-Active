import { Typography, Stack, Button } from '@mui/material';
import styled from "styled-components";

import BodyPartImage from '../assets/icons/yoga.png';
import TargetImage from '../assets/icons/yoga2.png';
import EquipmentImage from '../assets/icons/yoga3.png';

const Detail = ({ exerciseDetail }) => {
    const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

    const extraDetail = [
        {
            icon: BodyPartImage,
            name: bodyPart,
        },
        {
            icon: TargetImage,
            name: target,
        },
        {
            icon: EquipmentImage,
            name: equipment,
        },
    ];

    return (
        <div>
            <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>

                <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
                    <Typography sx={{ fontSize: { lg: '50px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
                        {name}
                    </Typography>
                    <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
                        Exercises keep you strong.{' '}
                        <span style={{ textTransform: 'capitalize' }}>{name}</span> bup is one
                        of the best <br /> exercises to target your {target}. It will help you improve your{' '}
                        <br /> mood and gain energy.
                    </Typography>
                    {extraDetail?.map((item) => (
                        <Stack key={item.name} direction="row" gap="24px" alignItems="center">
                            <Button sx={{ background: 'linear-gradient(to right, #f27121, #e94057)', borderRadius: '50%', width: '80px', height: '80px' }}>
                                <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
                            </Button>
                            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '26px', xs: '20px' } }}>
                                {item.name}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
                <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
            </Stack>
            <Wrapper2>
                <h2>Add {name} to your workout schedule</h2>
                <div>
                    <label htmlFor="reps">Reps: </label>
                    <input type="number" id="reps" />
                    <label htmlFor="sets">Sets: </label>
                    <input type="number" id="sets" />
                    <input type="date" id="exerciseDate" />
                    <AddButton
                        className={"addExercise"}
                    //onClick={() => }
                    >
                        Add
                    </AddButton>
                </div>
            </Wrapper2>
        </div>
    );
};

const Wrapper2 = styled.div`
  padding:3rem;
  margin: 20rem inherit 5rem;
  margin-top:40px;
  display: block;
  background: #ffd9cb;
  border-radius: 20px;
  
  div {
    margin-top:20px;
    display: flex;
    align-items: center;
  }

  .addExercise{
    margin-left: 250px;
    background: linear-gradient(to right, #f27121, #e94057);
    color: #fff;
    &:hover {
      transform: scale(1.1);
    }
  }

  input {
    flex: 1;
    width:90px;
    height: 40px; /* Adjust the height as needed */
    font-size: 16px; /* Adjust the font size as needed */
    margin-right: 50px; /* Add some space between select and input */
  }

  input{
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0 10px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(100%);
  }
`;

const AddButton = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
  font-size: 1rem;
`;

export default Detail;