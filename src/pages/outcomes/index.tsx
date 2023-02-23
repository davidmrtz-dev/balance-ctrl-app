import { useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../@types";
import { getOutcomes, searchOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "../../components/outcomes";
import Alert from "../../components/alert";
import styled from "styled-components";
import { Button, DatePicker, Input, Select, Typography } from "antd";
import { theme } from "../../Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDebouncedState } from "../../hooks/useDebouncedState";
const { RangePicker } = DatePicker;

const OutcomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 100%;
  width: 100%;
`;

type Selector =  TransactionType  | '';

const Outcomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);
  const [searchedOutcomes, setSearchedOutcomes] = useState<IOutcome []>([]);
  const [searchTerm, setSearchTerm] = useDebouncedState<string>('', 100);

  const displayOutcomes = () => {
    if (searchTerm) {
      return searchedOutcomes;
    } else {
      return outcomes;
    }
  };

  useEffect(() => {
    const fetchOutcomes = async(): Promise<void> => {
      try {
        const data = await getOutcomes({ offset: 0, limit: 20 });
        setOutcomes(data.outcomes);
        setTimeout(() => setLoading(false), 1500);
      } catch (err) {
        setTimeout(() => Alert({
          icon: 'error',
          title: 'Ops!',
          text: 'There was an error, please try again later'
        }), 1000);
      }
    };

    fetchOutcomes();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (searchTerm) {
      search(searchTerm);
    }
  }, [searchTerm]);

  const search = async (value: string): Promise<void> => {
    try {
      setLoading(true);
      const data = await searchOutcomes({ offset: 0, limit: 20, keyword: value});
      setSearchedOutcomes(data.outcomes);
      setTimeout(() => setLoading(false), 1000);
    } catch (err: any) {
      const error = err.errors && err.errors.length && err.errors[0];
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: (error || 'There was an error, please try again.'),
      }), 1000);
    }
  };

  return(<>
    <Search
      value={searchTerm}
      setValue={setSearchTerm}
    />
    {loading
      ? <LoadingMask fixed />
      : <OutcomesContainer reveal={reveal}>
          {(displayOutcomes() || []).map(outcome =>
            <Outcome key={outcome.id} {...outcome} />
          )}
        </OutcomesContainer>
    }
  </>);
};

const SearchWrapper = styled.div<{ showFilters: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border-bottom-left-radius: ${p => p.showFilters ? '0' : '10'}px;
	border-bottom-right-radius: ${p => p.showFilters ? '0': '10'}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
`;

const Search = ({
  value,
  setValue
}: {
  value: string;
  setValue: (value: string) => void;
}): JSX.Element => {
	const [showFilters, setShowFilters] = useState(false);
	return (<>
		<SearchWrapper showFilters={showFilters}>
			<Input
				style={{ margin: '0 5px' }}
				prefix={<FontAwesomeIcon
					style={{ flex: 1, paddingRight: 5 }}
					color={theme.colors.blacks.normal}
					size='1x'
					icon={faSearch}
				/>}
				suffix={<FontAwesomeIcon
					style={{ cursor: 'pointer' }}
					color={theme.colors.blacks.normal}
					size='1x'
					icon={faClose}
					onClick={() => value && setValue('')}
				/>}
				value={value}
				onChange={(e) => setValue(e.target.value)}
        placeholder='Search'
			/>
			<Button
				style={{ marginRight: 5 }}
				onClick={() => setShowFilters(!showFilters)}
			>
				<FontAwesomeIcon
					color={theme.colors.blacks.normal}
					size='1x'
					icon={showFilters ? faChevronUp : faChevronDown}
				/>
			</Button>
		</SearchWrapper>
		<Filters visible={showFilters} />
	</>);
};

const FiltersContainer = styled.div<{ visible: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: ${p => p.visible ? '126' : '0'}px;
	overflow: hidden;
	transition: height .5s ease-in-out;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Filters = ({
	visible
}: {
	visible: boolean;
}): JSX.Element => <FiltersContainer visible={visible}>
  <RangePicker
    style={{
      width: '100%',
      margin: '0 5px'
    }}
    allowClear
    onCalendarChange={(values) => console.log(values)}
    />
    <TypeSelector onSelect={() => {}} clearSelect={() => {}} disabled={false} />
    <Button type='primary'>Apply</Button>
</FiltersContainer>;

const TypeSelectorWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const TypeSelector = ({
  onSelect,
  clearSelect,
  disabled
}: {
  onSelect: (text: Selector) => void
  clearSelect: () => void;
  disabled: boolean;
}): JSX.Element => <TypeSelectorWrapper>
  <Select
    allowClear
    onClear={clearSelect}
    disabled={disabled}
    placeholder={'Type'}
    style={{ backgroundColor: theme.colors.grays.light, flex: 3 }}
    dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
    onSelect={onSelect}
    options={[
      { value: 'current', label: 'Current' },
      { value: 'fixed', label: 'Fixed' }
    ]}
  />
</TypeSelectorWrapper>;

export default Outcomes;