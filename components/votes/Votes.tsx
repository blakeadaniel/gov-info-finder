import React from 'react';
import { styled } from '@shipt/react-native-tachyons';
import { VoteCountType, Votes } from '../../fetchers/types';
import { Text, View } from 'react-native';
import { TEXT } from '../../constants/Text';

type PartyType = {
  party: 'Republican' | 'Democratic' | 'Independent';
};

const ShadowContainer = styled(View)``;
const ContentContainer = styled(View)`ba mv2 mh2 br2 pa2`;
const ChamberText = styled(Text)``;
const VotesContainer = styled<PartyType, typeof View>(
  View
)`flx-row mt2 pv1 br2 ph1 bg-${({ party }: PartyType) =>
  party === 'Republican'
    ? 'lightcoral'
    : party === 'Democratic'
    ? 'lightblue'
    : 'lightgrey'}`;
const PartyName = styled(Text)`underline wp25`;
const VoteCount = styled(Text)`mr2 bold`;

export function VotesComponent({ vote }: Votes) {
  const title = vote?.description;
  const chamber = vote?.chamber;

  type VoteInfoProps = {
    party: 'Republican' | 'Democratic' | 'Independent';
    partyVote: VoteCountType;
  };

  const getVoteInfo = ({ party, partyVote }: VoteInfoProps) =>
    React.useMemo(() => {
      return (
        <VotesContainer party={party}>
          <PartyName>{`${party} `}</PartyName>
          <VoteCount>{TEXT.YES_VOTE + partyVote.yes}</VoteCount>
          <VoteCount>{TEXT.NO_VOTE + partyVote.no}</VoteCount>
          <VoteCount>{TEXT.NOT_VOTING_VOTE + partyVote.not_voting}</VoteCount>
          <VoteCount>{TEXT.PRESENT_VOTE + partyVote.present}</VoteCount>
        </VotesContainer>
      );
    }, []);

  return (
    // <ShadowContainer>
    <ContentContainer>
      <ChamberText>{title}</ChamberText>
      {getVoteInfo({ party: 'Democratic', partyVote: vote.democratic })}
      {getVoteInfo({ party: 'Republican', partyVote: vote.republican })}
      {getVoteInfo({ party: 'Independent', partyVote: vote.independent })}
    </ContentContainer>
    // </ShadowContainer>
  );
}