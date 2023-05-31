import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel, { stepLabelClasses } from "@mui/material/StepLabel";
import { useState,useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChoiceSeat from './ChoiceSeat';
import Payment from './Payment';
import axios from 'axios';
import Ticket from '../../context/Ticket';
import 'tailwindcss/tailwind.css'
import ListTicket from '../../context/ListTicket';




const NextButton = styled(Button)({
  border: '1px solid transparent',
  backgroundColor: '#ff0000',
  color: '#fff',
  borderRadius: '30px',
  padding: '0.5rem',
  fontSize: '1.5rem',
  fontWeight: '600',
  boxShadow: '0px 0px 7px 8px #ff00004d',
  transition: 'box-shadow 0.3s ease',
  position: 'relative',
  marginRight: '100px',
  textAlign: 'center',
 
});
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const ColorlibStepLabel = styled(StepLabel)(() => ({
    [`& .${stepLabelClasses.label}`]: {
      [`&.${stepLabelClasses.completed}`]: {
        color: "rgb(255, 255, 255, 0.3)"
      },
      [`&.${stepLabelClasses.active}`]: {
        color: "rgb(255, 255, 255, 0.9)"
      },
  
      color: "rgb(255, 0, 64)	"
    }
  }));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Chọn ghế', 'Thanh toán', 'Thông tin vé'];



const Bookingticket=()=> {


  const [seats, setSeats] = useState([]);

  
 

  useEffect(() => {
    // Lấy dữ liệu từ API bằng Axios
    axios.get('https://cinema-00wj.onrender.com/tickets/show/3/')
      .then((response) => {
        setSeats(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu từ API:', error);
      });
  }, []);

  const [activeStep, setActiveStep] = useState(null);

  const handleNext=()=>{
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  

  const [state, setState] = useState({});
  const[list, setList]=useState([]);

  function getStepContent(stepIndex){

    switch(stepIndex){
      case 0:
        return <ChoiceSeat seats={seats}/>
      case 1:
        return <Payment/>;
      case 2:
         return "Step Three (Thong tin ve)";
      default: return "Unknown Step";
    }
  }

  return (
    <ListTicket.Provider value={[list, setList]}>
    <Ticket.Provider value={[state, setState]}>
    <div className='mx-44'>
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <ColorlibStepLabel StepIconComponent={ColorlibStepIcon}>{label}</ColorlibStepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
          </Typography>
          <Stack sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Stack sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </React.Fragment>
      ) : (
        
        
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>

          <NextButton variant="contained" onClick={handleNext} sx={{ ml: 1}}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </NextButton>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1}}
            >
              Back
            </Button>
         
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}
              
            
        
        </React.Fragment>

        
      )}
    </Stack>
    </div>
    </Ticket.Provider>
    </ListTicket.Provider>
  );
}   

export default Bookingticket;