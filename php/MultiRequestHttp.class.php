<?
class Http_MultiRequest
{
    //要并行抓取的url 列表
    private $urls = array();

    //curl 的选项
    private $options;
    
    //构造函数
    function __construct($options = array())
    {
        $this->setOptions($options);
    }

    //设置url 列表
    function setUrls($urls)
    {
        $this->urls = $urls;
        return $this;
    }

    //设置选项
    function setOptions($options)
    {
        $options[CURLOPT_RETURNTRANSFER] = 1;
        if (isset($options['HTTP_POST'])) 
        {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $options['HTTP_POST']);
            unset($options['HTTP_POST']);
        }

        if (!isset($options[CURLOPT_USERAGENT])) 
        {
            $options[CURLOPT_USERAGENT] = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1;)';
        }

        if (!isset($options[CURLOPT_FOLLOWLOCATION])) 
        {
            $options[CURLOPT_FOLLOWLOCATION] = 1;
        }

        if (!isset($options[CURLOPT_HEADER]))
        {
            $options[CURLOPT_HEADER] = 0;
        }
        $this->options = $options;
    }

    //并行抓取所有的内容
    function exec()
    {
        if(empty($this->urls) || !is_array($this->urls))
        {
            return false;
        }
        $curl = $data = array();
        $mh = curl_multi_init();
        foreach($this->urls as $k => $v)
        {
            $curl[$k] = $this->addHandle($mh, $v);
        }
        $this->execMulitHandle($mh);
        foreach($this->urls as $k => $v)
        {
            $data[$k] = curl_multi_getcontent($curl[$k]);
            curl_multi_remove_handle($mh, $curl[$k]);
        }
        curl_multi_close($mh);
        return $data;
    }
    
    //只抓取一个网页的内容。
    function execOne($url)
    {
        if (empty($url)) {
            return false;
        }
        $ch = curl_init($url);
        $this->setOneOption($ch);
        $content = curl_exec($ch);
        curl_close($ch);
        return $content;
    }
    
    //内部函数，设置某个handle 的选项
    private function setOneOption($ch)
    {
        curl_setopt_array($ch, $this->options);
    }

    //添加一个新的并行抓取 handle
    private function addHandle($mh, $url)
    {
        $ch = curl_init($url);
        $this->setOneOption($ch);
        curl_multi_add_handle($mh, $ch);
        return $ch;
    }

    //并行执行(这样的写法是一个常见的错误，我这里还是采用这样的写法，这个写法
    //下载一个小文件都可能导致cup占用100%, 并且，这个循环会运行10万次以上
    //这是一个典型的不懂原理产生的错误。这个错误在PHP官方的文档上都相当的常见。）
    private function execMulitHandle2($mh)
    {
        $i = 0;
        $running = null;
        do {
            curl_multi_exec($mh, $running);
            $i++;
        } while ($running > 0);
        //var_dump($i);
    }
    
    //应该用这样的写法
    private function execMulitHandle($mh)
    {
        $i = 0;
        do {$mrc = curl_multi_exec($mh,$active); $i++;} while ($mrc == CURLM_CALL_MULTI_PERFORM);
        while ($active && $mrc == CURLM_OK) 
        {
            if (curl_multi_select($mh) != -1)
            {
                do {$mrc = curl_multi_exec($mh, $active); $i++;} while ($mrc == CURLM_CALL_MULTI_PERFORM);
            }
            $i++;
        }
        //var_dump($i);
    }
}
?>
