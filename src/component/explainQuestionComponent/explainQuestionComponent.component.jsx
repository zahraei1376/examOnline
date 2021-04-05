import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
////////////////
import {ExplainDivContainer,ExplainDiv , TimeDiv ,MyTypography , MyButton , MyMainButton} from './explainQuestionComponent.styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    fontFamily:'Bnazanin',
    // background: 'linear-gradient(to left, #3f87a6, #ebf8e1)'
    backgroundColor:'#3f87a6',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
     {/* {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null} */}
      <MyTypography variant="h6">{children}</MyTypography>
      
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    direction:'rtl',
    textAlign:'right',
    fontFamily:'Bnazanin',
    zIndex:'10',
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    direction:'rtl',
    textAlign:'right',
    fontSize:'1.8rem',
    fontFamily:'Bnazanin',
    zIndex:'10',
  },
}))(MuiDialogActions);

function ExplainQuestion({number , explain , time}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ExplainDivContainer>
      <MyMainButton variant="outlined" color="primary" onClick={handleClickOpen}>
      {number + 1}
      </MyMainButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          توضیحات سوال
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {explain != 'undefined' ? (
            <ExplainDiv>
                توضیحات : {explain.split('%0A').join('\r\n')}
            </ExplainDiv>
            ) : (
                ''
            )}
            {time != 'undefined' ? (
            <TimeDiv>
                زمان : {time}
            </TimeDiv>
            ) : (
                ''
            )}
          </Typography>
          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
        </DialogContent>
        <DialogActions>
          <MyButton autoFocus onClick={handleClose} color="primary">
            بستن
          </MyButton>
        </DialogActions>
      </Dialog>
    </ExplainDivContainer>
  );
}

export default ExplainQuestion;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     flexBasis: '33.33%',
//     flexShrink: 0,
//   },
//   secondaryHeading: {
//     fontSize: theme.typography.pxToRem(15),
//     color: theme.palette.text.secondary,
//   },
// }));

// export default function ExplainQuestion({number , explain , time}) {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <div className={classes.root}>
//       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography className={classes.heading}>{number + 1}</Typography>
//           {/* <Typography className={classes.secondaryHeading}></Typography> */}
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//            {explain}
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2bh-content"
//           id="panel2bh-header"
//         >
//           <Typography className={classes.heading}>Users</Typography>
//           <Typography className={classes.secondaryHeading}>
//             You are currently not an owner
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
//             diam eros in elit. Pellentesque convallis laoreet laoreet.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3bh-content"
//           id="panel3bh-header"
//         >
//           <Typography className={classes.heading}>Advanced settings</Typography>
//           <Typography className={classes.secondaryHeading}>
//             Filtering has been entirely disabled for whole web server
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
//             vitae egestas augue. Duis vel est augue.
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel4bh-content"
//           id="panel4bh-header"
//         >
//           <Typography className={classes.heading}>Personal data</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
//             vitae egestas augue. Duis vel est augue.
//           </Typography>
//         </AccordionDetails>
//       </Accordion> */}
//     </div>
//   );
// }
