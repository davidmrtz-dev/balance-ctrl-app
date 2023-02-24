import { faChevronDown, faChevronUp, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { TransactionType } from "../../../@types";
import { theme } from "../../../Theme";
import { Filters } from "./Filters";

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
  search,
  setSearch,
	setDates,
	setType
}: {
  search: string;
  setSearch: (value: string) => void;
	setDates: (values: string []) => void;
	setType: (value: TransactionType | '') => void;
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
					onClick={() => search && setSearch('')}
				/>}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
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
		<Filters
			visible={showFilters}
			setDates={setDates}
			onApply={() => setShowFilters(false)}
			setType={setType}
		/>
	</>);
};

export default Search;