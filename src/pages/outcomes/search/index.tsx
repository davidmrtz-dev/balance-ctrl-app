import { faChevronDown, faChevronUp, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, DatePicker, Input, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { TransactionType } from "../../../@types";
import { theme } from "../../../Theme";

const { RangePicker } = DatePicker;
type Selector =  TransactionType  | '';

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

export default Search;