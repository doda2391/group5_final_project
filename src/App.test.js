import getWeather from './App';
import setWeather from './App';
import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount, configure } from 'enzyme';
import Form from './components/form.component';
import App from './App';
import SwitchesGroup from './components/SwitchesGroup.component';
import Switch from './components/SwitchesGroup.component';
import getAverage from './components/ShowPicsList.component';

configure({adapter: new Adapter()});

//unit test - getting celsius degree
test('calCelsius',()=>{
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  expect(comp.calCelsius(290)).toBe(16);
});

//unit test - calling api
test('call api2', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  comp.api_call2();
  expect(comp.api_call2()).toBeTruthy();
});

//unit test - changing order
test('call shoes order', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  comp.changeOrderHandler(true);
  expect(comp.state.LTH).toBe(true);
});

//unit test - checking shoes Info
test('check shoes info', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  const info = comp.api_call2;
  comp.setState({ shoeInfo: info});
  expect(comp.state.shoeInfo).toBeTruthy();
});

//unit test - setting city
test('input city', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  comp.setState({ city: 'Vancouver'});
  expect(comp.state.city).toBe("Vancouver");
});

//unit test - setting country
test('input country', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  comp.setState({ country: 'Canada'});
  expect(comp.state.country).toBe("Canada");
});

//unit test - setting weather icon
test('set weather icon', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  comp.setState({ icon: comp.weatherIcon.Clouds});
  expect(comp.state.icon).toBe("wi-day-fog");
});

//intergration test - getting weather icon 
test('get weather icon', () => {
  const wrapper = shallow(<App />);
  const comp = wrapper.instance();
  comp.get_WeatherIcon(comp.weatherIcon,803);
  expect(comp.state.icon).toBe("wi-day-fog");
});

//intergration test - calling getWeather function when the button is clicked
test('the button is clicked', () => {
  const wrapper = shallow(<Form />);
  wrapper.find('input').first().simulate('change', { targe: { value: 'Vancouver' } });
  wrapper.find('input').at(1).simulate('change', { targe: { value: 'Canada' } });
  wrapper.find('form').simulate('onSubmit', {
    preventDefault: () =>{}
  })
  expect(getWeather).toBeCalled;
});

//intergration test - switching the oder

//intergration test - shoes on sales

