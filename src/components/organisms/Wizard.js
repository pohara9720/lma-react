import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ifProp, prop, switchProp } from 'styled-tools';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: ${prop('headerBreakpoint')}px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const ProgressContainer = styled.div`
  margin: 0;
  max-width: ${prop('maxWidth')}px;
  width: 100%;
  @media (min-width: ${prop('headerBreakpoint')}px) {
    margin: 0 0 20px auto;
  }
`;

const ProgressSteps = styled.div`
  display: flex;
  ${ifProp(
  'progressStepsWidth',
  css`
      max-width: ${prop('progressStepsWidth')}px;
    `
)}
`;

const ProgressStep = styled.div`
  flex: 1 0 auto;
  position: relative;

  &:last-child {
    width: 8px;
    flex-grow: 0;
  }

  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 8px;
      right: 0;
      height: 2px;

      ${switchProp('state', {
  active: css`
          background: #DFE3E7;
        `,
  past: css`
          background-color: #5A8DEE;
        `,
  future: css`
          background: #DFE3E7;
        `,
})};
    }
  }
`;

const ProgressStepIndicator = styled.div`
  height: 8px;
  width: 8px;
  flex: 1 0 auto;
  border-radius: 50%;
  border: solid 2px;

  ${switchProp('state', {
  active: css`
      border-color: #5A8DEE;
    `,
  past: css`
      border-color: #5A8DEE;
      background-color: #5A8DEE;
    `,
  future: css`
      border-color: #DFE3E7;
    `,
})};
`;

const StepContent = styled.div`
  margin-top: 16px;
`;

const StepTitle = styled.div`
  font-size: 21px;
  font-weight: 900;
  margin-bottom: 16px;
`;

const Alert = styled.div`
  background-color: #ff0000;
    color: white;
    padding: 16px;
    font-weight: bold;
    border-radius: 8px;
`

const Banner = ({ className, ...props }) => (
  <Alert className={className} {...props} />
);

const ErrorBanner = styled(Banner)`
  max-width: 100%;
`;

const WizardContainer = styled.div``;

const calculateState = (active, index) => {
  if (active === index) {
    return 'active';
  }
  return active > index ? 'past' : 'future';
};

export const Wizard = ({
  children: steps,
  progressStepsWidth,
  headerBreakpoint,
  showHeader,
  error
}) => {
  const [active, setActive] = useState(0);

  if (!steps || !steps.length) {
    return null;
  }

  const activeComponent = steps[active];

  const { title } = activeComponent.props;

  const wizardCtrl = {
    prev: () => (active === 0 ? null : setActive(active - 1)),
    next: () => (active === steps.length - 1 ? null : setActive(active + 1)),
  };

  const renderWizardHeader = () => (
    <Header headerBreakpoint={headerBreakpoint}>
      <StepTitle>{title}</StepTitle>
      <ProgressContainer
        headerBreakpoint={headerBreakpoint}
        maxWidth={progressStepsWidth}>
        <ProgressSteps progressStepsWidth={progressStepsWidth}>
          {steps.map((step, index, array) => {
            const state = calculateState(active, index, array.length);
            return (
              <ProgressStep key={index} state={state}>
                <ProgressStepIndicator state={state} />
              </ProgressStep>
            );
          })}
        </ProgressSteps>
      </ProgressContainer>
    </Header>
  );


  return (
    <WizardContainer>
      {showHeader ? renderWizardHeader() : null}
      {error && <ErrorBanner>There is a problems in the form please go back and correct them before submitting</ErrorBanner>}
      <StepContent>
        {React.cloneElement(activeComponent, { wizard: wizardCtrl })}
      </StepContent>
    </WizardContainer>
  );
};



