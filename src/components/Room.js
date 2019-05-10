import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Button, Input, Spinner } from "./common";
import { startRoomListener, bet, win } from "../actions";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = { betSize: "0" };
  }

  componentDidMount() {
    console.log("room my dude");
    this.props.startRoomListener();
  }

  betSizeChange(betSize) {
    this.setState({ betSize });
  }

  onBetButtonPress() {
    this.props.bet(this.state.betSize);
  }
  onWinButtonPress() {
    this.props.win();
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.title}>RoomId:</Text>
          <Text>{this.props.roomId}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.title}>Blind:</Text>
          <Text>{this.props.blind}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.title}>Stack:</Text>
          <Text>{this.props.stack}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.title}>Pot:</Text>
          <Text>{this.props.pot}</Text>
        </CardSection>
        <CardSection>
          <Input
            label="Bet"
            placeholder="$$$"
            onChangeText={this.betSizeChange.bind(this)}
            value={this.state.betSize}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onBetButtonPress.bind(this)}>Raise/Bet</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onWinButtonPress.bind(this)}>Win Hand</Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    paddingRight: 5,
    paddingLeft: 15
  }
});

const mapStateToProps = ({ room }) => {
  const { blind, pot, members, roomId, stack } = room;

  return { blind, pot, members, roomId, stack };
};

export default connect(
  mapStateToProps,
  { startRoomListener, bet, win }
)(Room);
