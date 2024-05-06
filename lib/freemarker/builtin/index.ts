import { ThenBuiltin } from './ThenBuiltin';
import { UpperCaseBuiltin } from './UpperCaseBuiltin';
import { LowerCaseBuiltin } from './LowerCaseBuiltin';
import { CapFirstBuiltin } from './CapFirstBuiltin';
import { CapitalizeBuiltin } from './CapitalizeBuiltin';
import { UncapFirstBuiltin } from './UncapFirstBuiltin';
import { TrimBuiltin } from './TrimBuiltin';
import { ChopLinebreakBuiltin } from './ChopLinebreakBuiltin';
import { BooleanBuiltin } from './BooleanBuiltin';
import { DateBuiltin } from './DateBuiltin';
import { DatetimeBuiltin } from './DatetimeBuiltin';
import { TimeBuiltin } from './TimeBuiltin';
import { LengthBuiltin } from './LengthBuiltin';
import { SizeBuiltin } from './SizeBuiltin';
import { StringBuiltin } from './StringBuiltin';
import { ContainsBuiltin } from './ContainsBuiltin';
import { EndsWithBuiltin } from './EndsWithBuiltin';
import { EnsureEndsWithBuiltin } from './EnsureEndsWithBuiltin';
import { EnsureStartsWithBuiltin } from './EnsureStartsWithBuiltin';
import { IndexOfWithBuiltin } from './IndexOfBuiltin';
import { LastIndexOfWithBuiltin } from './LastIndexOfBuiltin';
import { KeepAfterBuiltin } from './KeepAfterBuiltin';
import { KeepAfterLastBuiltin } from './KeepAfterLastBuiltin';
import { KeepBeforeBuiltin } from './KeepBeforeBuiltin';
import { KeepBeforeLastBuiltin } from './KeepBeforeLastBuiltin';
import { LeftPadBuiltin } from './LeftPadBuiltin';
import { RightPadBuiltin } from './RightPadBuiltin';
import { MatchesBuiltin } from './MatchesBuiltin';
import { NumberBuiltin } from './NumberExpression';
import { ReplaceBuiltin } from './ReplaceBuiltin';
import { RemoveBeginningBuiltin } from './RemoveBeginningBuiltin';
import { RemoveEndingBuiltin } from './RemoveEndingBuiltin';
import { SplitBuiltin } from './SplitBuiltin';
import { StartsWithBuiltin } from './StartsWithBuiltin';
import { TruncateBuiltin } from './TruncateBuiltin';
import { UrlBuiltin } from './UrlBuiltin';
import { WordListBuiltin } from './WordListBuiltin';
import { IsInfiniteBuiltin } from './IsInfiniteBuiltin';
import { IsNanBuiltin } from './IsNanBuiltin';
import { LowerAbcBuiltin } from './LowerAbcBuiltin';
import { UpperAbcBuiltin } from './UpperAbcBuiltin';
import { RoundBuiltin } from './RoundBuiltin';
import { CeilBuiltin } from './CeilBuiltin';
import { FloorBuiltin } from './FloorBuiltin';
import { ChunkBuiltin } from './ChunkBuiltin';
import { DropWhileBuiltin } from './DropWhileBuiltin';
import { FilterBuiltin } from './FilterBuiltin';
import { FirstBuiltin } from './FirstBuiltin';
import { JoinBuiltin } from './JoinBuiltin';
import { LastBuiltin } from './LastBuiltin';
import { MapBuiltin } from './MapBuiltin';
import { MinBuiltin } from './MinBuiltin';
import { MaxBuiltin } from './MaxBuiltin';
import { ReverseBuiltin } from './ReverseBuiltin';
import { SeqContainsBuiltin } from './SeqContainsBuiltin';
import { SeqIndexOfBuiltin } from './SeqIndexOfBuiltin';
import { SeqLastIndexOfBuiltin } from './SeqLastIndexOfBuiltin';
import { SortBuiltin } from './SortBuiltin';
import { SortByBuiltin } from './SortByBuiltin';
import { TakeWhileBuiltin } from './TakeWhileBuiltin';
import { HasContentBuiltin } from './HasContentBuiltin';

const registry = [
    new ThenBuiltin(),
    new UpperCaseBuiltin(),
    new LowerCaseBuiltin(),
    new CapFirstBuiltin(),
    new CapitalizeBuiltin(),
    new UncapFirstBuiltin(),
    new TrimBuiltin(),
    new ChopLinebreakBuiltin(),
    new BooleanBuiltin(),
    new DateBuiltin(),
    new DatetimeBuiltin(),
    new TimeBuiltin(),
    new LengthBuiltin(),
    new SizeBuiltin(),
    new StringBuiltin(),
    new ContainsBuiltin(),
    new EndsWithBuiltin(),
    new EnsureEndsWithBuiltin(),
    new EnsureStartsWithBuiltin(),
    new IndexOfWithBuiltin(),
    new LastIndexOfWithBuiltin(),
    new KeepAfterBuiltin(),
    new KeepAfterLastBuiltin(),
    new KeepBeforeBuiltin(),
    new KeepBeforeLastBuiltin(),
    new LeftPadBuiltin(),
    new RightPadBuiltin(),
    new MatchesBuiltin(),
    new NumberBuiltin(),
    new ReplaceBuiltin(),
    new RemoveBeginningBuiltin(),
    new RemoveEndingBuiltin(),
    new SplitBuiltin(),
    new StartsWithBuiltin(),
    new TruncateBuiltin(),
    new UrlBuiltin(),
    new WordListBuiltin(),
    new IsInfiniteBuiltin(),
    new IsNanBuiltin(),
    new LowerAbcBuiltin(),
    new UpperAbcBuiltin(),
    new RoundBuiltin(),
    new CeilBuiltin(),
    new FloorBuiltin(),
    new ChunkBuiltin(),
    new DropWhileBuiltin(),
    new FilterBuiltin(),
    new FirstBuiltin(),
    new JoinBuiltin(),
    new LastBuiltin(),
    new MapBuiltin(),
    new MinBuiltin(),
    new MaxBuiltin(),
    new ReverseBuiltin(),
    new SeqContainsBuiltin(),
    new SeqIndexOfBuiltin(),
    new SeqLastIndexOfBuiltin(),
    new SortBuiltin(),
    new SortByBuiltin(),
    new TakeWhileBuiltin(),
    new HasContentBuiltin()
];

export function find(subject: any, name: string) {
    return registry.find(builtin => builtin.accept(subject, name));
}