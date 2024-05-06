import TitleBinder from './TitleBinder';
import ParagraphBinder from './ParagraphBinder';
import DivBinder from './DivBinder';
import LoginPanelBinder from './LoginPanelBinder';
import PageBinder from './PageBinder';
import WellBinder from './WellBinder';
import UserExplorerBinder from './UserExplorerBinder';
import ImageBinder from './ImageBinder';
import LinkBinder from './LinkBinder';
import BackLinkBinder from './BackLinkBinder';
import RegisterPanelBinder from './RegisterPanelBinder';
import ResetPasswordRequestPanelBinder from './ResetPasswordRequestPanelBinder';
import ResetPasswordPanelBinder from './ResetPasswordPanelBinder';
import AccordionItemHeaderBinder from './AccordionItemHeaderBinder';
import InsetTextBinder from './InsetTextBinder';
import AccordionItemBinder from './AccordionItemBinder';
import WarningBinder from './WarningBinder';
import ColumnBinder from './ColumnBinder';
import RowBinder from './RowBinder';
import CellBinder from './CellBinder';
import TableBinder from './TableBinder';
import BadgeBinder from './BadgeBinder';
import AccordionBinder from './AccordionBinder';
import CardHeaderBinder from './CardHeaderBinder';
import CardBodyBinder from './CardBodyBinder';
import CardFooterBinder from './CardFooterBinder';
import CardBinder from './CardBinder';
import IconBinder from './IconBinder';
import ToolTipBinder from './ToolTipBinder';
import ListItemBinder from './ListItemBinder';
import ListBinder from './ListBinder';
import CookieConsentBinder from './CookieConsentBinder';
import FakeStoreBinder from './FakeStoreBinder';
import ErrorSummaryBinder from './ErrorSummaryBinder';
import InputBinder from './InputBinder';
import EnumerationInputBinder from './EnumerationInputBinder';
import ValueBinder from './ValueBinder';
import ScaleBinder from './ScaleBinder';
import ButtonBinder from './ButtonBinder';
import JumbotronBinder from './JumbotronBinder';
import CarouselBinder from './CarouselBinder';
import CarouselPanelBinder from './CarouselPanelBinder';
import ProgressBarBinder from './ProgressBarBinder';
import FormBinder from './FormBinder';
import WizardTestResultsBinder from './WizardTestResultsBinder';
import ConfirmWorkflowPanelBinder from './ConfirmWorkflowPanelBinder';
import CloseWorkflowExecutedPanelBinder from './CloseWorkflowExecutedPanelBinder';
import FakeUserBinder from './FakeUserBinder';
import FakeMessageBinder from './FakeMessageBinder';
import FakeWizardBinder from './FakeWizardBinder';
import FakeWorkflowBinder from './FakeWorkflowBinder';
import MileStoneBinder from './MileStoneBinder';
import FakePageBinder from './FakePageBinder';
import HorizontalRuleBinder from './HorizontalRuleBinder';
import InitiateWorkflowButtonBinder from './InitiateWorkflowButtonBinder';
import MenuBinder from './MenuBinder';
import MenuBrandBinder from './MenuBrandBinder';
import MenuItemBinder from './MenuItemBinder';
import SubMenuBinder from './SubMenuBinder';
import SubMenuLabelBinder from './SubMenuLabelBinder';
import TrayBinder from './TrayBinder';
import TrayHeaderBinder from './TrayHeaderBinder';
import FakeQueueBinder from './FakeQueue';
import MessageExplorerBinder from './MessageExplorerBinder';
import NotificationBannerBinder from './NotificationBannerBinder';
import EmailBinder from './EmailBinder';
import EmailConfirmationLinkBinder from './EmailConfirmationLinkBinder';
import PasswordResetLinkBinder from './PasswordResetLinkBinder';
import ConfirmationPanelBinder from './ConfirmationPanelBinder';
import BrBinder from './BrBinder';
import SpanBinder from './SpanBinder';
import UuidBinder from './UuidBinder';
import ScriptBinder from './ScriptBinder';
import LoopBinder from './LoopBinder';
import SwitchBinder from './SwitchBinder';

const registry = [
    new TitleBinder(),
    new ParagraphBinder(),
    new DivBinder(),
    new LoginPanelBinder(),
    new WellBinder(),
    new UserExplorerBinder(),
    new ImageBinder(),
    new LinkBinder(),
    new BackLinkBinder(),
    new RegisterPanelBinder(),
    new PageBinder(),
    new ResetPasswordRequestPanelBinder(),
    new ResetPasswordPanelBinder(),
    new AccordionItemHeaderBinder(),
    new InsetTextBinder(),
    new AccordionItemBinder(),
    new WarningBinder(),
    new ColumnBinder(),
    new RowBinder(),
    new CellBinder(),
    new TableBinder(),
    new BadgeBinder(),
    new AccordionBinder(),
    new CardHeaderBinder(),
    new CardBodyBinder(),
    new CardFooterBinder(),
    new CardBinder(),
    new IconBinder(),
    new ToolTipBinder(),
    new ListItemBinder(),
    new ListBinder(),
    new CookieConsentBinder(),
    new FakeStoreBinder(),
    new ErrorSummaryBinder(),
    new InputBinder(),
    new EnumerationInputBinder(),
    new ValueBinder(),
    new ScaleBinder(),
    new ButtonBinder(),
    new JumbotronBinder(),
    new CarouselBinder(),
    new CarouselPanelBinder(),
    new ProgressBarBinder(),
    new FormBinder(),
    new WizardTestResultsBinder(),
    new ConfirmWorkflowPanelBinder(),
    new CloseWorkflowExecutedPanelBinder(),
    new FakeUserBinder(),
    new FakeMessageBinder(),
    new FakeWizardBinder(),
    new FakeWorkflowBinder(),
    new FakePageBinder(),
    new FakeQueueBinder(),
    new MileStoneBinder(),
    new HorizontalRuleBinder(),
    new InitiateWorkflowButtonBinder(),
    new MenuBinder(),
    new MenuBrandBinder(),
    new MenuItemBinder(),
    new SubMenuBinder(),
    new SubMenuLabelBinder(),
    new TrayBinder(),
    new TrayHeaderBinder(),
    new MessageExplorerBinder(),
    new NotificationBannerBinder(),
    new EmailBinder(),
    new EmailConfirmationLinkBinder(),
    new PasswordResetLinkBinder(),
    new ConfirmationPanelBinder(),
    new BrBinder(),
    new SpanBinder(),
    new UuidBinder(),
    new ScriptBinder(),
    new LoopBinder(),
    new SwitchBinder()
];

export function findBinder(name: string) {
    return registry.find(builtin => builtin.accept(name));
}