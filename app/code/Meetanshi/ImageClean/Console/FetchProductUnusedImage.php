<?php

namespace Meetanshi\ImageClean\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Meetanshi\ImageClean\Helper\Data;

/**
 * Class FetchProductUnusedImage
 * @package Meetanshi\ImageClean\Console
 */
class FetchProductUnusedImage extends Command
{
    /**
     * @var Data
     */
    protected $helper;

    /**
     * FetchProductUnusedImage constructor.
     * @param Data $data
     */
    public function __construct(Data $data)
    {
        $this->helper = $data;
        parent::__construct($name = null);
    }

    /**
     *
     */
    protected function configure()
    {
        $this->setName('imageclean:product-unused-image:fetch');
        $this->setDescription('ImageClean Fetch Product Image');
        parent::configure();
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->helper->compareList('unused');
        $output->writeln("Product Image(s) Successfully Fetched");
    }
}
