export default class TsElement extends Element {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullScreen(): Promise<void>;
    msRequestFullScreen(): Promise<void>;
}