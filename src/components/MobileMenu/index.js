import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import posed, { PoseGroup } from 'react-pose';
import * as actions from '../../store/actions';
import { Flex, Container } from '../UI';
import MobileMenuClose from './MobileMenuClose';
import MobileMenuLink from './MobileMenuLink';
import Logo from '../../assets/images/logo.svg';

const propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  closeMobileMenu: PropTypes.func,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

const Menu = posed.div({
  enter: { postion: 'fixed', opacity: 1, transform: 'scale(1)' },
  exit: { postion: 'fixed', opacity: 0, transform: 'scale(0.98)' },
});

const StyledMenu = styled(Menu)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: ${p => p.theme.colors.bgAlt};
  z-index: 999;
`;

const MenuTop = styled(Flex)`
  height: ${p => p.theme.headerHeight};
`;

const MenuLinks = styled(Flex)`
  width: 100%;
  height: calc(100vh - ${p => p.theme.headerHeight});
`;

const LinkTransitionContainer = posed.nav({
  enter: { staggerChildren: 70, delay: 250, delayChildren: 250 },
});

const LinkTransition = posed.div({
  enter: { y: 24, opacity: 1 },
  exit: { y: 0, opacity: 0 },
});

const Box = styled(LinkTransitionContainer)`
  margin: auto;
  width: 100%;
`;

const MobileMenu = ({ isMobileMenuOpen, closeMobileMenu, links }) => (
  <PoseGroup flipMove={false}>
    {isMobileMenuOpen && (
      <StyledMenu key="mobileMenu" pose>
        <Container fluid>
          <MenuTop
            alignItems="center"
            justifyContent="space-between"
            color="white"
          >
            <Link onClick={closeMobileMenu} style={{ color: '#fff' }} to="/">
              <Logo />
            </Link>
            <MobileMenuClose onClick={closeMobileMenu} />
          </MenuTop>
          <MenuLinks alignItems="center" width="100%">
            <Box>
              {links.map(link => (
                <LinkTransition
                  key={link.text}
                  style={{ opacity: 0, transform: 'translateY(-24px)' }}
                >
                  <MobileMenuLink
                    onClick={closeMobileMenu}
                    activeStyle={{ opacity: 1 }}
                    to={link.to}
                  >
                    {link.text}
                  </MobileMenuLink>
                </LinkTransition>
              ))}
            </Box>
          </MenuLinks>
        </Container>
      </StyledMenu>
    )}
  </PoseGroup>
);

MobileMenu.propTypes = propTypes;

const mapStateToProps = state => ({
  isMobileMenuOpen: state.ui.isMobileMenuOpen,
});

const mapDispatchToProps = dispatch => ({
  closeMobileMenu: () => dispatch(actions.closeMobileMenu()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileMenu);
